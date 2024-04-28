import Movie from "@/domains/Movie";
import { atom } from "jotai";

export const moviesAtom = atom<Movie[]>([]);
