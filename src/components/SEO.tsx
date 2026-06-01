import type { Metadata } from "next";

const SITE_URL = "https://osoulaldiafa.com";
const SITE_NAME = "أصول الضيافة";
const DEFAULT_OG_IMAGE = `${SITE_URL}/logo.webp`;

export interface SEOProps {
  title: string;
  description: string;
  path: string;
  ogImage?: string;
  ogImageAlt?: string;
  ogType?: "website" | "article" | "profile";
  twitterCard?: "summary" | "summary_large_image";
  keywords?: string[];
  noIndex?: boolean;
  publishedTime?: string;
  modifiedTime?: string;
}

export function generatePageMetadata({
  title,
  description,
  path,
  ogImage = DEFAULT_OG_IMAGE,
  ogImageAlt = `${SITE_NAME} - ${title}`,
  ogType = "website",
  twitterCard = "summary_large_image",
  keywords = [],
  noIndex = false,
  publishedTime,
  modifiedTime,
}: SEOProps): Metadata {
  const url = `${SITE_URL}${path}`;

  const defaultKeywords = [
    "أصول الضيافة",
    "خدمات ضيافة",
    "ضيافة فاخرة",
    "قهوة عربية",
    "صبابين قهوة",
    "ضيافة السعودية",
    "ضيافة المملكة",
    "ضيافة مناسبات",
    "قهوجي",
    "Osoul Al-Diafa",
    "Saudi hospitality",
  ];

  return {
    title,
    description,
    keywords: [...defaultKeywords, ...keywords],
    alternates: {
      canonical: url,
      languages: {
        "ar-SA": url,
      },
    },
    openGraph: {
      type: ogType,
      siteName: SITE_NAME,
      locale: "ar_SA",
      title: `${title} | ${SITE_NAME}`,
      description,
      url,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: ogImageAlt,
          type: "image/webp",
        },
      ],
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
    },
    twitter: {
      card: twitterCard,
      title: `${title} | ${SITE_NAME}`,
      description,
      images: [ogImage],
    },
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        },
  };
}

export const SEO_CONSTANTS = {
  SITE_URL,
  SITE_NAME,
  DEFAULT_OG_IMAGE,
  PHONE: "+966568997316",
  EMAIL: "info@osoulaldiafa.com",
  WHATSAPP: "966568997316",
  WHATSAPP_DISPLAY: "0568997316",
  ADDRESS: {
    region: "المملكة العربية السعودية",
    country: "SA",
    countryName: "المملكة العربية السعودية",
  },
} as const;
