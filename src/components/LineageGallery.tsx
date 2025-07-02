const LineageGallery = () => {
  const lineageData = [
    {
      semester: "SPR'14",
      image: "https://page1.genspark.site/v1/base64_upload/ac9b82c5d063fffddb63d14cdc7607cd",
      alt: "5 PHARAOHS OF REDEMPTION"
    },
    {
      semester: "FALL'14",
      image: "https://page1.genspark.site/v1/base64_upload/905ebc9ed9bc1c52c7afb989a5d501e2",
      alt: "ELEMENTS OF RECLAMATION"
    },
    {
      semester: "FALL'15",
      image: "https://page1.genspark.site/v1/base64_upload/089a71e2ec457b9fb8d23e87a589b8bf",
      alt: "COMBATIVE INFUSION"
    },
    {
      semester: "FALL'16",
      image: "https://page1.genspark.site/v1/base64_upload/807c0e33b47676241d597a8cefe82e43",
      alt: "PHRIGID WAR4ARE"
    },
    {
      semester: "FALL'17",
      image: "https://page1.genspark.site/v1/base64_upload/2907ee196a8ed464455dbded05601d4d",
      alt: "DIVERGENT RESILIENCY"
    },
    {
      semester: "SPR'18",
      image: "https://page1.genspark.site/v1/base64_upload/42714fbd554ad31c5f6ea6dda34666d7",
      alt: "ELITE VANGUARDS OF OPULENCE"
    },
    {
      semester: "SPR'19",
      image: "https://page1.genspark.site/v1/base64_upload/70861af5f3dd7b62c85a14cb2cff0770",
      alt: "5 REFLECTIONS OF LEGACY"
    },
    {
      semester: "SPR'20",
      image: "https://page1.genspark.site/v1/base64_upload/53cbb0aaabf355a1a1cb144a1190c00e",
      alt: "PHROZEN COALITION"
    },
    {
      semester: "FALL'21",
      image: "https://page1.genspark.site/v1/base64_upload/415783a6c35482ba39b400ef0fbf401b",
      alt: "CHAOTIC TENACITY"
    },
    {
      semester: "SPR'22",
      image: "https://page1.genspark.site/v1/base64_upload/5325400c808bcc987777ba190f2acc3b",
      alt: "REBELS 4 REVOLUTION"
    },
    {
      semester: "SPR'23",
      image: "https://page1.genspark.site/v1/base64_upload/79f79eac4f0aae322b3aff59ee9ab4af",
      alt: "PHURIOUS TRIO OF GIZA"
    },
    {
      semester: "SPR'24",
      image: "https://page1.genspark.site/v1/base64_upload/1ef04fb42244150bc876fb5e4e6d4e56",
      alt: "CENTRAL INTELLIGENCE"
    }
  ];

  return (
    <section id="lineage" className="py-20 bg-secondary/20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-primary relative pb-4 mb-8 section-title">
          Tau Nu Lineage
        </h2>
        <div className="w-full overflow-x-hidden relative">
          <div className="lineage-scroll flex min-w-max">
            {lineageData.map((item, index) => (
              <div 
                key={index}
                className="min-w-[300px] mr-8 bg-background/70 border-2 border-primary rounded-lg overflow-hidden shadow-lg hover-scale"
              >
                <img
                  src={item.image}
                  alt={item.alt}
                  className="w-[300px] h-[300px] object-cover"
                />
                <div className="text-center py-3 bg-background/80 border-t border-primary">
                  <span className="text-primary font-bold text-lg uppercase tracking-wide">
                    {item.semester}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LineageGallery;