import { Card, CardBody } from "@/components/ui/Card";
import { FiStar } from "react-icons/fi";
import reviewsData from "@/content/reviews.json";

interface Review {
  id: string;
  text: string;
  author: string;
  role: string;
  rating: number;
}

/**
 * Sekce recenzí zákazníků s hvězdičkami.
 */
export function Reviews() {
  const reviews = reviewsData as Review[];

  return (
    <section id="recenze" className="py-16 md:py-24 bg-white">
      <div className="container-main">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-sans font-bold text-coffee mb-3">
            Co říkají naši hosté
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <Card key={review.id} className="flex flex-col">
              <CardBody className="flex flex-col flex-1 space-y-3">
                {/* Hvězdičky */}
                <div
                  className="flex gap-0.5"
                  aria-label={`Hodnocení ${review.rating} z 5`}
                >
                  {Array.from({ length: 5 }).map((_, i) => (
                    <FiStar
                      key={i}
                      className={
                        i < review.rating
                          ? "w-4 h-4 fill-amber-400 text-amber-400"
                          : "w-4 h-4 text-cream-400"
                      }
                      aria-hidden="true"
                    />
                  ))}
                </div>

                {/* Citát */}
                <blockquote className="flex-1 text-coffee-700 font-serif text-base italic">
                  &ldquo;{review.text}&rdquo;
                </blockquote>

                {/* Autor */}
                <div className="pt-2 border-t border-cream-200">
                  <p className="font-sans font-semibold text-coffee text-sm">
                    {review.author}
                  </p>
                  <p className="font-sans text-xs text-coffee-400">
                    {review.role}
                  </p>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
