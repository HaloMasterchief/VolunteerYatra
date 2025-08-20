"use client";

import { useState, useEffect } from "react";
import { Opportunity } from "./types";
import "./globals.css";

export default function Home() {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
const [searchTerm, setSearchTerm] = useState("");
const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
const [suggestions, setSuggestions] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
const [applied, setApplied] = useState<number[]>([]);
const [showSuggestions, setShowSuggestions] = useState(false);

useEffect(() => {
  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `http://localhost:5000/api/opportunities?search=${debouncedSearchTerm}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch opportunities");
      }
      const data = await response.json();
      setOpportunities(data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  fetchData();
}, [debouncedSearchTerm]);

useEffect(() => {
  const fetchSuggestions = async () => {
    if (debouncedSearchTerm) {
      try {
        const response = await fetch(
          `http://localhost:5000/api/suggestions?query=${debouncedSearchTerm}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch suggestions");
        }
        const data = await response.json();
        setSuggestions(data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
      }
    } else {
      setSuggestions([]);
    }
  };

  fetchSuggestions();
}, [debouncedSearchTerm]);

useEffect(() => {
  const handler = setTimeout(() => {
    setDebouncedSearchTerm(searchTerm);
  }, 500);

  return () => {
    clearTimeout(handler);
  };
}, [searchTerm]);

  const handleApply = async (id: number) => {
    try {
      const response = await fetch("http://localhost:5000/api/applications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ opportunity_id: id }),
      });

      if (response.ok) {
        setApplied((prev) => [...prev, id]);
      } else {
        throw new Error("Application failed");
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        alert(err.message);
      } else {
        alert("Failed to apply");
      }
    }
  };

  return (
    <main
      className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-200 flex flex-col"
      style={{ fontFamily: "Inter, Arial, sans-serif" }}
    >
      <header className="text-center mb-12 pt-10">
        <h1 className="text-5xl font-extrabold text-blue-900 mb-3 tracking-tight drop-shadow-lg">
          Volunteer Opportunities
        </h1>
        <p className="text-lg text-blue-700 max-w-3xl mx-auto leading-relaxed">
          Discover meaningful volunteer opportunities that match your skills and
          interests
        </p>
      </header>

      {/* Search Section */}
      <section className="max-w-2xl mx-auto mb-10">
        <label htmlFor="search" className="sr-only">
          Search by keyword, skill, or organization...
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-blue-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-blue-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <div className="relative">
            <input
              id="search"
              type="text"
              placeholder="Search by keyword, skill, or organization..."
              className="block w-full rounded-lg border border-blue-200 bg-white py-3 pl-10 pr-4 
                text-blue-900 placeholder-blue-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-500 
                focus:outline-none transition duration-200 ease-in-out shadow-md"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={() => setShowSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            />
            {showSuggestions && suggestions.length > 0 && (
              <ul className="absolute z-10 w-full bg-white border border-blue-200 rounded-b-lg shadow-lg max-h-40 overflow-y-auto">
                {suggestions.map((suggestion, index) => (
                  <li
                    key={index}
                    className="px-4 py-2 cursor-pointer hover:bg-blue-50"
                    onClick={() => {
                      setSearchTerm(suggestion);
                      setShowSuggestions(false);
                    }}
                  >
                    {suggestion}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </section>

      {/* Loading State */}
      {loading && (
        <div className="flex flex-col items-center py-16 text-blue-700">
          <div
            className="animate-spin rounded-full h-8 w-8 border-t-4 border-blue-600 border-solid"
            aria-label="Loading spinner"
          ></div>
          <p className="mt-4 text-lg font-medium">Loading opportunities...</p>
        </div>
      )}

      {/* Error State */}
      {error && (
        <section
          role="alert"
          className="bg-red-50 border-l-4 border-red-600 p-4 rounded-lg max-w-3xl mx-auto mb-10 shadow-md"
        >
          <div className="flex items-center space-x-3">
            <svg
              className="h-5 w-5 text-red-600 flex-shrink-0"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v4a1 1 0 002 0V7zm-1 8a1.25 1.25 0 110-2.5 1.25 1.25 0 010 2.5z"
                clipRule="evenodd"
              />
            </svg>
            <p className="text-sm font-semibold text-red-700">{error}</p>
          </div>
        </section>
      )}

      {/* Opportunities Grid */}
      {!loading && !error && (
        <>
          <section
            aria-live="polite"
            aria-atomic="true"
            className="grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          >
            {opportunities.map((opp) => (
              <article
                key={opp.id}
                className="bg-white rounded-2xl shadow-xl border border-blue-200 p-8 flex flex-col justify-between
                  hover:shadow-2xl transition-shadow duration-300 ease-in-out"
              >
                <header className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-2xl font-bold text-blue-900 mb-1 tracking-wide">
                      {opp.title}
                    </h2>
                    <div className="flex items-center text-blue-500 text-sm space-x-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-blue-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                        focusable="false"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      <span className="ml-1">Remote</span>
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-blue-400 to-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full select-none shadow">
                    NEW
                  </div>
                </header>

                <p className="text-blue-700 mb-6 flex-grow leading-relaxed text-base">
                  {opp.description}
                </p>

                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-blue-800 mb-2 tracking-wide">
                    SKILLS NEEDED
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {opp.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full select-none shadow-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => handleApply(opp.id)}
                  disabled={applied.includes(opp.id)}
                  className={`w-full flex items-center justify-center rounded-lg px-4 py-3 font-semibold text-white shadow-lg transition 
                    duration-300 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 
                    focus-visible:outline-blue-500 ${
                      applied.includes(opp.id)
                        ? "bg-green-600 hover:bg-green-600 cursor-default"
                        : "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 active:from-blue-800 active:to-blue-900"
                    }`}
                  aria-pressed={applied.includes(opp.id)}
                >
                  {applied.includes(opp.id) ? (
                    <>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 mr-2 text-white"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Applied
                    </>
                  ) : (
                    "Apply Now"
                  )}
                </button>
              </article>
            ))}
          </section>

          {/* Empty State */}
          {opportunities.length === 0 && (
            <section className="text-center py-16 text-blue-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="mx-auto mb-6 h-8 w-8 text-blue-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h3 className="text-xl font-semibold mb-2 select-none text-blue-800">
                No opportunities found
              </h3>
              <p className="max-w-md mx-auto leading-relaxed text-blue-700">
                Try adjusting your search or check back later for new
                opportunities
              </p>
            </section>
          )}
        </>
      )}

      {/* Footer */}
      <footer className="mt-auto py-8 bg-blue-900 text-blue-100 text-center shadow-inner">
        <div className="max-w-7xl mx-auto px-4">
          <span className="font-semibold">Volunteer Portal</span> &copy;{" "}
          {new Date().getFullYear()} &mdash; Empowering Communities
        </div>
      </footer>
    </main>
  );
}
