import { z } from "zod";

const personalEmailDomains = [
  "gmail.com",
  "yahoo.com",
  "hotmail.com",
  "outlook.com",
  "wp.pl",
  "o2.pl",
  "interia.pl",
  "onet.pl",
];

export const leadFormSchema = z.object({
  name: z
    .string()
    .min(2, "Podaj imię i nazwisko (min. 2 znaki)")
    .max(100, "Maksymalnie 100 znaków")
    .regex(/^[\p{L}\s'-]+$/u, "Użyj tylko liter, spacji i myślników"),
  company: z
    .string()
    .min(2, "Podaj nazwę firmy")
    .max(200, "Maksymalnie 200 znaków"),
  email: z
    .string()
    .email("Podaj prawidłowy adres e-mail")
    .max(254)
    .refine(
      (email) => {
        const domain = email.split("@")[1]?.toLowerCase();
        return domain && !personalEmailDomains.includes(domain);
      },
      { message: "Użyj służbowego adresu e-mail (nie prywatnego)" }
    ),
  phone: z
    .string()
    .max(20)
    .regex(/^[\d\s+()-]*$/, "Nieprawidłowy format telefonu")
    .optional()
    .or(z.literal("")),
  industry: z.string().min(1, "Wybierz branżę"),
  companySize: z.string().min(1, "Wybierz wielkość organizacji"),
  interestArea: z.string().min(1, "Wybierz obszar zainteresowania"),
  regulatedBy: z.array(z.string()).default([]),
  message: z
    .string()
    .min(20, "Opisz potrzebę (min. 20 znaków)")
    .max(3000, "Maksymalnie 3000 znaków"),
  preferredContact: z.string().optional(),
  consentContact: z.literal(true, {
    errorMap: () => ({ message: "Wymagana zgoda na kontakt handlowy" }),
  }),
  consentPrivacy: z.literal(true, {
    errorMap: () => ({ message: "Wymagana akceptacja polityki prywatności" }),
  }),
  website: z.string().max(0).optional(),
});

export type LeadFormData = z.infer<typeof leadFormSchema>;

export const leadQualificationSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email().max(254),
  company: z.string().min(2).max(200),
  regulation: z.enum(["nis2", "dora", "ksc", "iso27001", "other"]),
  consentContact: z.literal(true),
  consentPrivacy: z.literal(true),
  website: z.string().max(0).optional(),
});

export type LeadQualificationData = z.infer<typeof leadQualificationSchema>;

export const INDUSTRIES = [
  "Finanse i ubezpieczenia",
  "Energetyka i infrastruktura krytyczna",
  "Przemysł i produkcja",
  "Ochrona zdrowia",
  "Sektor publiczny",
  "Telekomunikacja i IT",
  "Handel i logistyka",
  "Inna",
] as const;

export const COMPANY_SIZES = [
  "1–49 pracowników",
  "50–249 pracowników",
  "250–999 pracowników",
  "1000+ pracowników",
] as const;

export const INTEREST_AREAS = [
  "Pentest",
  "Audyt",
  "SOC",
  "OT/ICS",
  "Compliance",
  "Dokumentacja",
  "Inne",
] as const;

export const REGULATED_OPTIONS = [
  "DORA",
  "NIS2",
  "KSC",
  "ISO 27001",
  "KNF",
  "Medyczne",
  "Inne",
] as const;
