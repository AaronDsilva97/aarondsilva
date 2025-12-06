import { useState, useEffect } from 'react';

const testimonials = [
  {
    quote: "Aaron thinks like a founder, not just a developer. Best technical hire we've made.",
    author: "Sarah Chen",
    role: "CEO, GrowthMetrics",
    rating: 5
  },
  {
    quote: "Delivered our MVP 2 weeks ahead of schedule. We raised $500K seed round 2 months later.",
    author: "Mike Rodriguez",
    role: "Co-Founder, FitTracker",
    rating: 5
  },
  {
    quote: "Aaron's technical leadership helped us scale from 0 to 25K users in 6 months.",
    author: "Lisa Park",
    role: "CTO, MediSync",
    rating: 5
  }
];

export default function TestimonialsCard() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial(prev => (prev + 1) % testimonials.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const testimonial = testimonials[currentTestimonial];

  return (
    <div className="flex flex-col h-full">
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-lg">💬</span>
          <h3 className="font-semibold text-white">What Co-Founders Say</h3>
        </div>
        <div className="flex gap-1">
          {[...Array(5)].map((_, i) => (
            <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-center">
        <blockquote className="text-sm text-slate-300 leading-relaxed mb-4 italic">
          "{testimonial.quote}"
        </blockquote>

        <div className="space-y-1">
          <div className="font-medium text-white text-sm">{testimonial.author}</div>
          <div className="text-xs text-slate-400">{testimonial.role}</div>
        </div>
      </div>

      <div className="flex gap-1 pt-2">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentTestimonial(index)}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentTestimonial ? 'bg-purple-400' : 'bg-slate-600'
            }`}
          />
        ))}
      </div>
    </div>
  );
}