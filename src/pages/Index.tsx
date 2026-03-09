import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import TrustBadges from "@/components/TrustBadges";
import InsuranceTypes from "@/components/InsuranceTypes";
import InsuranceComparison from "@/components/InsuranceComparison";
import HowItWorks from "@/components/HowItWorks";
import ImpactCounter from "@/components/ImpactCounter";
import InsuranceGuide from "@/components/InsuranceGuide";
import FAQSection from "@/components/FAQSection";
import Testimonials from "@/components/Testimonials";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import AIChatbot from "@/components/AIChatbot";
import FloatingQuoteForm from "@/components/FloatingQuoteForm";
import ScrollToTop from "@/components/ScrollToTop";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <TrustBadges />
        <InsuranceTypes />
        <InsuranceComparison />
        <HowItWorks />
        <ImpactCounter />
        <InsuranceGuide />
        <FAQSection />
        <Testimonials />
        <CTASection />
      </main>
      <Footer />
      <AIChatbot />
      <FloatingQuoteForm />
      <ScrollToTop />
      <WhatsAppButton />
    </div>
  );
};

export default Index;
