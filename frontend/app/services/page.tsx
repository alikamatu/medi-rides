import WebsiteFooter from "@/components/homepage/footer/website-footer";
import MedicalTransportWithImage from "@/components/homepage/medical-transport/medical-transport-withImage";
import Navigation from "@/components/homepage/navigation";
import NonMedicalTransportOverview from "@/components/homepage/non-medical-transport/non-medical-transport-overview";
import NonMedicalTransportWithImage from "@/components/homepage/non-medical-transport/non-medical-transport-with-image";
import EligibilitySection from "@/components/services/eligibility-section";
import FAQSection from "@/components/services/faq-section";
import InsuranceSection from "@/components/services/insurance-section";
import PricingSection from "@/components/services/pricing-section";
import RideExpectations from "@/components/services/ride-expectations";
import ServicesCTASection from "@/components/services/services-cta-section";
import ServicesHero from "@/components/services/services-hero";

export default function ServicesPage() {
  return (
    <main className="min-h-screen">
    <Navigation />
    <ServicesHero />
    <MedicalTransportWithImage />
    <NonMedicalTransportWithImage />
    <EligibilitySection />
    <PricingSection />
    <InsuranceSection />
    <RideExpectations />
    <FAQSection />
    <ServicesCTASection />
    <WebsiteFooter />
    </main>
  );
}