"use client";
import style from "./index.module.scss";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Routes } from "@/constants";
import Hamburguer from "./hamburguer";
import Nav from "./nav";

type HeaderDefaultProps = {
  searchStatus: boolean;
};

export default function HeaderDefault({ searchStatus }: HeaderDefaultProps) {
  const [headerType, setHeaderType] = useState("default");
  const [searchModalStatus, setSearchModalStatus] = useState(false);
  const [hamburguerStatus, setHamburguerStatus] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setHeaderType("alternative");
      } else {
        setHeaderType("default");
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleSearchModal = () => {
    setSearchModalStatus(!searchModalStatus);
  };

  return (
    <header
      id={style.header}
      className="d-flex flex-row justify-content-between align-items-center padding-lr-t1 padding-tb-30 margin-b-0"
      style={
        headerType === "alternative"
          ? { background: "rgba(55,156,53,0.2)" }
          : {}
      }
    >
      <Link href={Routes.HOME}>
        <img
          id={style["header-logo"]}
          src="/img/Rectangle 1.svg"
          width={213}
          height={40}
          alt="logo"
        />
      </Link>

      <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
        <Nav searchStatus={searchStatus} headerType={headerType} />
        <div
          id={style.openSearchBtn}
          onClick={() => setHamburguerStatus(true)}
          className="d-xl-none d-xxl-none"
          style={{
            width: "52px",
            height: "52px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            className="d-inline d-sm-inline d-md-inline d-lg-inline d-xl-none d-xxl-none"
            src="/img/hamburger2.svg"
            alt="hamburguer"
            width={20}
            height={20}
          />
        </div>
      </div>
      {hamburguerStatus === true && (
        <img
          id={style["closeMenu"]}
          className="d-lg-none d-xl-none d-xxl-none"
          src="/img/fi-rr-cross.svg"
          alt="close"
          width={24}
          height={24}
          onClick={() => setHamburguerStatus(false)}
        />
      )}
      {hamburguerStatus === true && (
        <Hamburguer setHamburguerStatus={setHamburguerStatus} />
      )}
    </header>
  );
}
