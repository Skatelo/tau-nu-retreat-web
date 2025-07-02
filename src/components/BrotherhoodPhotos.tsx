const BrotherhoodPhotos = () => {
  const photos = [
    "https://page.genspark.site/v1/base64_upload/f5cc8cbec6415e364d3879bf8949e339",
    "https://page.genspark.site/v1/base64_upload/6d9e513c43665e8c578e42cacd0049aa",
    "https://page.genspark.site/v1/base64_upload/4950faa2aaee90fc7599084d6ff636d2",
    "https://page.genspark.site/v1/base64_upload/d70c8db98240c1ec4f1b4e81d164c14e",
    "https://page.genspark.site/v1/base64_upload/d3989018f2cebe878b9682d13c538060",
    "https://page.genspark.site/v1/base64_upload/3849dc938cf1af0ade250b11cc402b12",
    "https://page.genspark.site/v1/base64_upload/c40f169bdc5335042905ca1faca48c97"
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-primary relative pb-4 mb-8 section-title">
          Brotherhood
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {photos.map((photo, index) => (
            <div 
              key={index}
              className="overflow-hidden rounded-lg border-2 border-primary hover-scale shadow-lg"
              style={{ 
                filter: 'brightness(1)',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.filter = 'brightness(1.2)';
                e.currentTarget.style.boxShadow = '0 5px 15px hsl(var(--primary) / 0.5)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.filter = 'brightness(1)';
                e.currentTarget.style.boxShadow = '';
              }}
            >
              <img
                src={photo}
                alt="Tau Nu Brothers Group Photo"
                className="w-full h-full object-cover transition-all duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrotherhoodPhotos;