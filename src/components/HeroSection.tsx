const HeroSection = () => {
  return (
    <section 
      id="home" 
      className="relative min-h-[500px] flex items-center justify-center text-center p-8"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('https://page.genspark.site/v1/base64_upload/dce4e52d357e7126800ec672c77a50e3')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="container mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-primary">
          The Tau Nu Chapter 2025 Retreat
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-foreground">
          The Brothers of The Tau Nu Chapter of Alpha Phi Alpha Fraternity Incorporated, 
          will be having their retreat on July 12th - July 14th
        </p>
      </div>
    </section>
  );
};

export default HeroSection;