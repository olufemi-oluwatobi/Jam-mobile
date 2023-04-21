import { useEffect, useState, useMemo } from "react";
import _debounce from "lodash/debounce";
import { useAuth } from "../useAuth";
import { BASE_URL } from "../../constants";
import useStateWithCallback from "../useStateWithCallback";

interface Genre {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
}

interface Artist {
  id: number;
  name: string;
  bio: string;
  image: string;
  created_at: string;
  updated_at: string;
  genres: Genre[];
}

interface SearchParams {
  searchQuery: string;
  limit: number;
  page: number;
}

const useArtistList = (fetchOnMount: boolean = true) => {
  const [artists, setArtists] = useStateWithCallback<Artist[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchParams, setSearchParams] = useStateWithCallback<SearchParams>({
    searchQuery: "",
    limit: 50,
    page: 1,
  });
  const {
    state: { token: authToken },
  } = useAuth();

  const { searchQuery } = searchParams;

  const fetchArtists = async (
    query: SearchParams = {} as SearchParams,
    clearOldData: boolean = true
  ) => {
    query = { ...searchParams, ...query };
    setLoading(true);
    try {
      console.log(searchParams.searchQuery);
      const response = await fetch(
        `${BASE_URL}/artists?search=${query.searchQuery}&limit=${searchParams.limit}&page=${searchParams.page}`
      );
      const data = await response.json();
      setArtists((prevArtists) => {
        return clearOldData
          ? data.data.artists
          : [...prevArtists, ...data.data.artists];
      });
      setLoading(false);
    } catch (error) {
      console.error("Error fetching artists:", error);
      setLoading(false);
    }
  };

  const addFavoriteArtist = async (
    userId: number,
    artistId: number | number[]
  ) => {
    try {
      setLoading(true);
      const response = await fetch(
        `${BASE_URL}/users/${userId}/favourite_artist`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken?.token}`,
          },
          body: JSON.stringify({ artistId: artistId }),
        }
      );
      const data = await response.json();
      console.log("Favorite artist added:", data);
    } catch (error) {
      console.error("Error adding favorite artist:", error);
      return error;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (fetchOnMount) fetchArtists();
  }, []);

  const debouncedSearch = _debounce(
    (clearOldData: boolean) => fetchArtists(searchParams, clearOldData),
    500
  );

  const memoizedArtists = useMemo(() => artists, [artists]);

  const loadMore = () => {
    setSearchParams((prevSearchParams) => ({
      ...prevSearchParams,
      page: prevSearchParams.page + 1,
    }));
  };

  const handleSearch = (searchQuery: string) => {
    setSearchParams(
      (prevSearchParams) => ({
        ...prevSearchParams,
        searchQuery,
        page: 1,
      }),
      () => debouncedSearch(false)
    );
  };

  return {
    artists: memoizedArtists,
    loading,
    loadMore,
    handleSearch,
    fetchArtists,
    addFavoriteArtist,
  };
};

export default useArtistList;
