import React from 'react';

export default function Mission() {
  const scenes = [
    { 
      label: 'Person at a standing desk, back brace visible', 
      offset: '',
      img: '/photos/a5a7819a-ea94-4017-b6f9-3dc20d733e4e.png'
    },
    { 
      label: 'Person walking outdoors, knee support visible', 
      offset: 'mt-9',
      img: '/photos/5e60300c-8f36-42c4-b627-d0026d2cf39a.png'
    },
    { 
      label: 'Person relaxing on the sofa with neck massager', 
      offset: '',
      img: '/photos/bce1845a-d15a-4526-8c08-a93024615b43.png'
    },
  ];

  return (
    <section id="mission" className="w-full bg-cream-d">
      <div className="max-w-[1440px] mx-auto px-6 md:px-16 py-24 md:py-28 flex flex-col items-center gap-12">

        <div className="text-center max-w-[620px] space-y-4">
          <span className="text-[13px] text-sage font-medium tracking-wide uppercase">Our approach</span>
          <h2 className="text-3xl md:text-4xl leading-[1.15] tracking-tight text-ink">
            We help you move through your day without pain running the schedule.
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-5xl">
          {scenes.map((s, i) => (
            <div
              key={i}
              className={`aspect-[3/4] bg-cream border border-sand rounded-[18px] overflow-hidden shadow-sm hover:shadow-md transition-shadow ${s.offset}`}
            >
              <img 
                src={s.img} 
                alt={s.label}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.parentElement.innerHTML = '<div class="w-full h-full flex items-center justify-center text-sage text-sm p-6 text-center bg-cream">' + s.label + '</div>';
                }}
              />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
