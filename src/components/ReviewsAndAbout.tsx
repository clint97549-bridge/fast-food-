import React, { useState } from 'react';
import { Star } from 'lucide-react';
import {
  CustomerReview,
  INITIAL_REVIEWS,
  RESTAURANT_INFO,
} from '../data/menuData';

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
      dishOrdered: dishOrdered.trim() || 'Crispy Zinger Roll & Smoky Beast',
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
    <div className="max-w-[1320px] mx-auto px-4 sm:px-6 space-y-8 pt-6 pb-8">
      {/* Customer Reviews Section */}
      <section id="reviews" className="scroll-mt-[136px]">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-5">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-zinc-900 tracking-tight">
              Karachi Customer Reviews
            </h2>
            <p className="text-xs sm:text-sm text-zinc-500 mt-0.5">
              Rated 4.9 / 5 across Jamshed Road No. 3, PECHS &amp; Bahadurabad
            </p>
          </div>
          <button
            type="button"
            onClick={() => setShowReviewForm((prev) => !prev)}
            className="px-4 py-2 rounded-full bg-zinc-100 hover:bg-black hover:text-white text-zinc-900 text-xs font-bold transition-colors cursor-pointer self-start sm:self-auto whitespace-nowrap"
          >
            {showReviewForm ? 'Close Form' : 'Write a Review'}
          </button>
        </div>

        {showReviewForm && (
          <form
            onSubmit={handleSubmitReview}
            className="mb-6 p-5 rounded-2xl bg-[#F4F4F5] border border-zinc-200 grid grid-cols-1 sm:grid-cols-2 gap-3.5"
          >
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="Your Name *"
              required
              className="px-3.5 py-2.5 rounded-xl bg-white border border-zinc-200 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-black"
            />
            <input
              type="text"
              value={dishOrdered}
              onChange={(e) => setDishOrdered(e.target.value)}
              placeholder="Dish Ordered (e.g. Crispy Zinger Roll)"
              className="px-3.5 py-2.5 rounded-xl bg-white border border-zinc-200 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-black"
            />
            <div className="sm:col-span-2 flex items-center gap-1.5">
              <span className="text-xs font-semibold text-zinc-600 mr-1">
                Rating:
              </span>
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className="cursor-pointer p-0.5"
                  aria-label={`Rate ${star} stars`}
                >
                  <Star
                    className={`w-4 h-4 ${
                      star <= rating
                        ? 'text-[#FF4D00] fill-[#FF4D00]'
                        : 'text-zinc-300'
                    }`}
                  />
                </button>
              ))}
            </div>
            <textarea
              rows={2}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Share your feedback on Roll N Roll... *"
              required
              className="sm:col-span-2 px-3.5 py-2.5 rounded-xl bg-white border border-zinc-200 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-black resize-none"
            />
            <div className="sm:col-span-2 flex justify-end">
              <button
                type="submit"
                className="px-5 py-2.5 rounded-full bg-black hover:bg-[#FF4D00] text-white font-bold text-xs cursor-pointer transition-colors"
              >
                Post Review
              </button>
            </div>
          </form>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="p-5 rounded-2xl bg-white border border-zinc-200/80 shadow-[0_2px_10px_rgba(0,0,0,0.03)] flex flex-col justify-between gap-4"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2.5">
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: rev.rating }).map((_, idx) => (
                      <Star
                        key={idx}
                        className="w-3.5 h-3.5 text-[#FF4D00] fill-[#FF4D00]"
                      />
                    ))}
                  </div>
                  <span className="text-[11px] font-medium text-zinc-400">
                    {rev.date}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-zinc-700 leading-relaxed">
                  "{rev.comment}"
                </p>
              </div>
              <div className="pt-3 border-t border-zinc-100 text-xs">
                <div className="font-bold text-zinc-900">{rev.author}</div>
                <div className="text-zinc-500 mt-0.5">
                  {rev.neighborhood} · {rev.dishOrdered}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Light Gray About / Info Box matching Burger Lab reference video (0:48) */}
      <section
        id="about"
        className="scroll-mt-[136px] rounded-2xl bg-[#F4F4F5] border border-zinc-200/70 p-6 sm:p-8 text-xs sm:text-sm text-zinc-700 leading-relaxed space-y-1.5"
      >
        <p className="font-semibold text-zinc-900">
          Check out the amazing food variety of Roll N Roll — Karachi.
        </p>
        <p>
          We strive to bring the best experience of online ordering, crispy paratha
          rolls, smashed beef burgers, pizzas, pastas, broast &amp; desi specials to
          our customers across Karachi.
        </p>
        <p>
          Visit our branch at{' '}
          <span className="font-semibold text-zinc-900">
            {RESTAURANT_INFO.address}
          </span>{' '}
          or order fresh delivery directly online or via WhatsApp ({RESTAURANT_INFO.phoneDisplay})!
        </p>
      </section>
    </div>
  );
};
