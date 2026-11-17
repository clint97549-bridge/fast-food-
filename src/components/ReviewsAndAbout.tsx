import React, { useState } from 'react';
import { Flame, ShieldCheck, Star, Timer } from 'lucide-react';
import { CustomerReview, INITIAL_REVIEWS, LOGO_URL } from '../data/menuData';

export const ReviewsAndAbout: React.FC = () => {
  const [reviews, setReviews] = useState<CustomerReview[]>(INITIAL_REVIEWS);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [author, setAuthor] = useState('');
  const [dishOrdered, setDishOrdered] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author.trim() || !comment.trim()) return;
    const newReview: CustomerReview = {
      id: `rev-${Date.now()}`,
      author: author.trim(),
      neighborhood: 'Karachi',
      rating,
      dishOrdered: dishOrdered.trim() || 'Signature Roll & Smash Burger',
      comment: comment.trim(),
      date: 'Just now',
    };
    setReviews((prev) => [newReview, ...prev]);
    setAuthor('');
    setDishOrdered('');
    setRating(5);
    setComment('');
    setShowReviewForm(false);
  };

  return (
    <div className="bg-[#0a0a0c] border-t border-white/10">
      {/* Customer Reviews Section */}
      <section
        id="reviews"
        className="scroll-mt-[140px] max-w-[1380px] mx-auto px-4 sm:px-6 py-14"
      >
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold uppercase tracking-wide text-white">
              Karachi Customer Reviews
            </h2>
            <p className="text-sm text-zinc-400 mt-1">
              Rated 4.9 / 5 by regulars across Jamshed Road, PECHS & Bahadurabad
            </p>
          </div>
          <button
            type="button"
            onClick={() => setShowReviewForm((prev) => !prev)}
            className="px-4 py-2 rounded-lg bg-zinc-900 hover:bg-amber-500 hover:text-black text-amber-400 border border-amber-500/30 text-xs font-bold transition-colors cursor-pointer self-start sm:self-auto whitespace-nowrap"
          >
            {showReviewForm ? 'Close Form' : 'Write a Review'}
          </button>
        </div>

        {showReviewForm && (
          <form
            onSubmit={handleSubmitReview}
            className="mb-8 p-5 rounded-xl bg-[#131316] border border-amber-500/30 grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="Your Name *"
              required
              className="px-3.5 py-2.5 rounded-lg bg-zinc-900 border border-white/10 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-amber-500"
            />
            <input
              type="text"
              value={dishOrdered}
              onChange={(e) => setDishOrdered(e.target.value)}
              placeholder="Dish Ordered (e.g. Smoky Beast)"
              className="px-3.5 py-2.5 rounded-lg bg-zinc-900 border border-white/10 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-amber-500"
            />
            <div className="sm:col-span-2 flex items-center gap-2">
              <span className="text-xs text-zinc-400 font-medium">Rating:</span>
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className="cursor-pointer p-0.5"
                  aria-label={`Rate ${star} stars`}
                >
                  <Star
                    className={`w-5 h-5 ${
                      star <= rating
                        ? 'text-amber-400 fill-amber-400'
                        : 'text-zinc-600'
                    }`}
                  />
                </button>
              ))}
            </div>
            <textarea
              rows={2}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Share your experience with Roll N Roll... *"
              required
              className="sm:col-span-2 px-3.5 py-2.5 rounded-lg bg-zinc-900 border border-white/10 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-amber-500 resize-none"
            />
            <div className="sm:col-span-2 flex justify-end">
              <button
                type="submit"
                className="px-5 py-2.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs cursor-pointer"
              >
                Post Review
              </button>
            </div>
          </form>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="p-5 rounded-xl bg-[#121214] border border-white/10 flex flex-col justify-between gap-4"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: rev.rating }).map((_, idx) => (
                      <Star
                        key={idx}
                        className="w-4 h-4 text-amber-400 fill-amber-400"
                      />
                    ))}
                  </div>
                  <span className="text-xs text-zinc-500">{rev.date}</span>
                </div>
                <p className="text-sm text-zinc-200 leading-relaxed">
                  "{rev.comment}"
                </p>
              </div>
              <div className="pt-3 border-t border-white/5 text-xs">
                <div className="font-bold text-white">{rev.author}</div>
                <div className="text-zinc-400 mt-0.5">
                  {rev.neighborhood} · {rev.dishOrdered}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* About / Our Story Section */}
      <section
        id="about"
        className="scroll-mt-[140px] border-t border-white/5 bg-[#101012]"
      >
        <div className="max-w-[1380px] mx-auto px-4 sm:px-6 py-14 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center gap-3">
              <img
                src={LOGO_URL}
                alt="Roll N Roll Brand Emblem"
                referrerPolicy="no-referrer"
                className="w-12 h-12 rounded-full object-cover border-2 border-amber-500/80"
              />
              <div>
                <h2 className="font-display text-3xl sm:text-4xl font-bold uppercase tracking-wide text-white">
                  Our Story — Karachi's Late-Night Favorite
                </h2>
              </div>
            </div>
            <p className="text-sm sm:text-base text-zinc-300 leading-relaxed max-w-2xl">
              Born at Jamshed Road No. 3 (M.L Plaza, Shop No. 4, Opposite Ghazi Bakery) in the heart of Karachi, Roll N Roll brings together crispy golden paratha rolls, flat-top smashed beef burgers, injected zingers, hand-tossed pizzas, creamy pastas, and authentic charcoal tikka & masala khausa — all prepared fresh to order with 100% Zabiha Halal ingredients.
            </p>
          </div>

          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-3.5">
            <div className="p-4 rounded-xl bg-[#161619] border border-white/10 flex items-center gap-3.5">
              <Flame className="w-5 h-5 text-amber-400 shrink-0" />
              <div>
                <div className="text-sm font-bold text-white">Freshly Seared & Crispy</div>
                <div className="text-xs text-zinc-400">
                  Smashed beef patties & hand-breaded zingers cooked per order
                </div>
              </div>
            </div>
            <div className="p-4 rounded-xl bg-[#161619] border border-white/10 flex items-center gap-3.5">
              <ShieldCheck className="w-5 h-5 text-amber-400 shrink-0" />
              <div>
                <div className="text-sm font-bold text-white">100% Halal & Quality Kitchen</div>
                <div className="text-xs text-zinc-400">
                  Pure beef, fresh daily produce & house-made signature dips
                </div>
              </div>
            </div>
            <div className="p-4 rounded-xl bg-[#161619] border border-white/10 flex items-center gap-3.5">
              <Timer className="w-5 h-5 text-amber-400 shrink-0" />
              <div>
                <div className="text-sm font-bold text-white">Fast Karachi Delivery</div>
                <div className="text-xs text-zinc-400">
                  Hot dispatch across Jamshed Road, PECHS, Bahadurabad & Gulshan
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
