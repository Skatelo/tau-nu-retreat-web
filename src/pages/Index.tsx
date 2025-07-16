import VideoLoadingScreen from "../components/VideoLoadingScreen";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import CountdownTimer from "@/components/CountdownTimer";
import Timeline from "@/components/Timeline";
import LineageGallery from "@/components/LineageGallery";
import BrotherhoodPhotos from "@/components/BrotherhoodPhotos";
import Footer from "@/components/Footer";
import DonationForm from "@/components/DonationForm";
import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <VideoLoadingScreen />
      <Header />
      <HeroSection />
      
      {/* Retreat Info Section */}
      <section id="retreat" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-primary relative pb-4 mb-8 section-title">
            Unwind at The Tau Nu Chapter Retreat in Charlotte
          </h2>
          <div className="max-w-3xl mx-auto text-center">
            <p className="mb-6 text-foreground">
              We are excited to announce The Inaugural Tau Nu Chapter Retreat, designed for both chapter 
              and alumni brothers to come together for a weekend of fellowship, goal-setting, and community 
              service. During the retreat, we will be bridging gaps, and redefining our chapters goals and 
              objectives. We hope to see all of our brothers there for a weekend of growth, connection, and service.
            </p>
          </div>
          
          <CountdownTimer />
          <Timeline />
          
          {/* Register Button */}
          <div className="text-center mt-12">
            <Button 
              variant="gold" 
              size="xl" 
              asChild
              className="hover-lift"
            >
              <a 
                href="https://docs.google.com/forms/d/e/1FAIpQLSdL8RfmsNNfwcvj5xXgdSaHoPnGfeOlQeCI_yzD88u0yhuImg/viewform?usp=sf_link" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                Register Now
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="py-20 bg-secondary/20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-primary relative pb-4 mb-8 section-title">
            About Us
          </h2>
          <div className="max-w-3xl mx-auto text-foreground">
            <p className="mb-6">
              The Rebirth of The Tau Nu Chapter Retreat in July 2024, signifies a period of renewed connection 
              and the fortification of the bonds that unite the brothers, underpinning the revered foundations of 
              our esteemed House of 907. This Retreat, extending over a weekend, is meticulously planned to focus 
              on strategic development and the deepening of camaraderie among the brothers. It represents a pivotal 
              opportunity for members to come together, stepping away from the bustling and spirited activities 
              surrounding the UNCP Homecoming, thereby fostering a serene and focused environment.
            </p>
            
            <p className="mb-6">
              The essence of this Retreat lies in its commitment to not only rejuvenate the spirit of brotherhood 
              but also to lay down a roadmap for future endeavors that will propel the Chapter towards greater heights. 
              It is a carefully curated space that allows for reflection, planning, and strengthening of interpersonal 
              bonds, ensuring that each member feels an integral part of the collective journey. The Retreat is designed 
              to underscore its invaluable contribution to the brotherhood, making it a cornerstone event that reaffirms 
              the commitment of the brothers to one another and to the overarching goals of the House of 907. Through 
              engaging activities, strategic discussions, and shared experiences, the Retreat promises to be a milestone 
              event that will significantly enhance the unity and purpose of the brotherhood, ensuring its continued 
              impact and legacy.
            </p>
            
            <h3 className="text-2xl font-bold mt-8 mb-4 text-primary">Our Mission</h3>
            <p className="mb-6">
              Alpha Phi Alpha Fraternity, Inc. develops leaders, promotes brotherhood and academic excellence, 
              while providing service and advocacy for our communities.
            </p>
            
            <h3 className="text-2xl font-bold mt-8 mb-4 text-primary">Our Motto</h3>
            <p className="mb-6">"First of All, Servants of All, We Shall Transcend All"</p>
            
            <h3 className="text-2xl font-bold mt-8 mb-4 text-primary">Our Pillars</h3>
            <p>Manly Deeds, Scholarship, and Love For All Mankind</p>
          </div>
        </div>
      </section>

      <LineageGallery />

      {/* Alumni Association Section */}
      <section id="alumni" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-primary relative pb-4 mb-8 section-title">
            Alumni Association Contract
          </h2>
          <div className="max-w-3xl mx-auto text-center">
            <p className="mb-8 text-foreground">
              The purpose of this agreement is to foster collaboration between Alumni and Undergraduates to 
              support the ongoing success and sustainability of the undergraduate chapter. This includes 
              facilitating successful planning, fundraising efforts, donations, and financial contributions.
            </p>
            <Button 
              variant="gold" 
              size="xl" 
              asChild
              className="hover-lift"
            >
              <a 
                href="https://docuseal.co/d/B4We9BzrgF3JFy" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                Join the Alumni Network
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Donation Section */}
      <section id="donate" className="py-20 bg-secondary/20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-primary relative pb-4 mb-8 section-title">
            Donate
          </h2>
          <div className="max-w-3xl mx-auto text-center">
            <p className="mb-8 text-foreground">
              Every single donation made towards The Tau Nu Chapter Retreat is sincerely appreciated and holds 
              immense value. By extending your support, you play a pivotal role in not only reinforcing the bonds 
              of brotherhood within our organization but also in significantly elevating our ability to make a 
              meaningful difference in the communities we are dedicated to serving. Your generosity ensures that 
              we can continue to grow and expand our outreach, making a lasting impact where its needed most.
            </p>
            <DonationForm />
          </div>
        </div>
      </section>

      <BrotherhoodPhotos />
      <Footer />
    </div>
  );
};

export default Index;
