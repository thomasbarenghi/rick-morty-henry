"use client";
import { ReactNode, useEffect } from "react";
import { usePathname, useParams, useRouter } from "next/navigation";
import { useAppDispatch } from "@/redux/hooks";
import { getGames, getGameById } from "@/redux/slices/client/favorites";
type Props = {
  children: ReactNode;
};

export default function Querier({ children }: Props) {
  const pathname = usePathname();
  const params = useParams();
  const router = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (pathname === "/games") {
      dispatch(getGames());
    }

    console.log("pathname", pathname, params.gameId, router);

    if (params?.gameId) {
      dispatch(getGameById(params?.gameId.toString()));
    }
  }, [pathname, dispatch, params.gameId, router]);

  return <div>{children}</div>;
}
