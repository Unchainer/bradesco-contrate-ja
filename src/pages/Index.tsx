import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import InsuranceTypes from "@/components/InsuranceTypes";
import HowItWorks from "@/components/HowItWorks";
import ImpactCounter from "@/components/ImpactCounter";
import InsuranceGuide from "@/components/InsuranceGuide";
import FAQSection from "@/components/FAQSection";
import Testimonials from "@/components/Testimonials";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import AIChatbot from "@/components/AIChatbot";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <InsuranceTypes />
        <HowItWorks />
        <ImpactCounter />
        <InsuranceGuide />
        <FAQSection />
        <Testimonials />
        <CTASection />
      </main>
      <Footer />
      <AIChatbot />
      <WhatsAppButton />
    </div>
  );
};

export default Index;
