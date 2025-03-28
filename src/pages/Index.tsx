
import Layout from "@/components/layout/Layout";
import HeroSection from "@/components/HeroSection";
import FeaturedKitchens from "@/components/FeaturedKitchens";
import HowItWorks from "@/components/HowItWorks";
import data from "@/data";

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <FeaturedKitchens kitchens={data.kitchens} />
      <HowItWorks />
    </Layout>
  );
};

export default Index;
