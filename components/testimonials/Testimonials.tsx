import React from "react";
import { Container } from "../ui/Container";
import { SectionHeading } from "../ui/SectionHeading";
import { TestimonialCard } from "./TestimonialCard";
import { testimonials } from "../../constants/testimonials";

export function Testimonials() {
  const row1 = testimonials.slice(0, 3);
  const row2 = testimonials.slice(3, 6);

  return (
    <section
      id="testimonials"
      className="py-24 sm:py-36 bg-[#0B0B0B] border-b border-white/5 overflow-hidden"
    >
      <Container>
        <SectionHeading
          title="What Clients Say"
          description="Direct reviews from team leaders and clients on working together."
        />
      </Container>

      {/* Infinite Scroll Container with Fade Masks */}
      <div className="relative w-full overflow-hidden mt-16 sm:mt-24 flex flex-col gap-6 sm:gap-8">
        {/* Left and Right Fade Gradients */}
        <div className="absolute inset-y-0 left-0 w-16 sm:w-48 bg-gradient-to-r from-[#0B0B0B] via-[#0B0B0B]/90 to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-16 sm:w-48 bg-gradient-to-l from-[#0B0B0B] via-[#0B0B0B]/90 to-transparent z-10 pointer-events-none" />

        {/* Row 1: Left scrolling */}
        <div className="relative flex w-full overflow-hidden hover-pause">
          <div className="flex gap-6 sm:gap-8 shrink-0 animate-marquee pr-6 sm:pr-8">
            {row1.map((testimonial) => (
              <div
                key={testimonial.id}
                className="w-[320px] sm:w-[450px] shrink-0"
              >
                <TestimonialCard
                  testimonial={testimonial}
                  animateOnScroll={false}
                />
              </div>
            ))}
          </div>
          <div
            className="flex gap-6 sm:gap-8 shrink-0 animate-marquee pr-6 sm:pr-8"
            aria-hidden="true"
          >
            {row1.map((testimonial) => (
              <div
                key={`dup1-${testimonial.id}`}
                className="w-[320px] sm:w-[450px] shrink-0"
              >
                <TestimonialCard
                  testimonial={testimonial}
                  animateOnScroll={false}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
