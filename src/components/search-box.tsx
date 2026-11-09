"use client";

import {
  useEffect,
  useId,
  useRef,
  useState,
  type FormEvent,
  type KeyboardEvent,
} from "react";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  ArrowUpRight,
  Search,
  CornerDownLeft,
  LoaderCircle,
  X,
  SearchX,
  Download,
  FileDown,
} from "lucide-react";
import { getCategory } from "@/data/categories";
import { getSearchProvider } from "@/lib/search-provider";
import { Highlight } from "./highlight";
import { formSearchLabel } from "@/lib/form-display";

type Suggestion = {
  id: string;
  title: string;
  detail: string;
  href: string;
  category: boolean;
  downloadName?: string;
  tooltip?: string;
};

export function SearchBox({
  initialQuery = "",
  compact = false,
}: {
  initialQuery?: string;
  compact?: boolean;
}) {
  const [query, setQuery] = useState(initialQuery);
  const [open, setOpen] = useState(false);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [active, setActive] = useState(-1);
  const [status, setStatus] = useState<"idle" | "loading" | "ready" | "error">(
    "idle",
  );
  const input = useRef<HTMLInputElement>(null);
  const root = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const id = useId();
  const listId = "suggestions-" + id;
  const visible = open && query.trim().length >= 2;

  useEffect(() => setQuery(initialQuery), [initialQuery]);
  useEffect(() => {
    const onShortcut = (event: globalThis.KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        input.current?.focus();
        setOpen(true);
      }
    };
    document.addEventListener("keydown", onShortcut);
    return () => document.removeEventListener("keydown", onShortcut);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onOutside = (event: PointerEvent) => {
      if (!root.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onOutside);
    return () => document.removeEventListener("pointerdown", onOutside);
  }, [open]);

  useEffect(() => {
    if (!visible) return;
    let current = true;
    setStatus("loading");
    setSuggestions([]);
    setActive(-1);
    const timer = window.setTimeout(async () => {
      try {
        const provider = await getSearchProvider();
        if (!current) return;
        const [allHits, categoryHits, formHits] = await Promise.all([
          provider.search(query),
          provider.suggestCategories(query),
          provider.searchForms(query),
        ]);
        if (!current) return;
        const hits = allHits.slice(0, 4);
        setSuggestions([
          ...hits.map(({ article }) => ({
            id: article.slug,
            title: article.title,
            detail:
              (getCategory(article.category)?.shortName ?? "") +
              " · " +
              article.readingTime +
              " min",
            href: "/articol/" + article.slug,
            category: false,
          })),
          ...categoryHits.map((category) => ({
            id: category.slug,
            title: category.name,
            detail: "Explorează categoria",
            href: "/categorii/" + category.slug,
            category: true,
          })),
          ...formHits.slice(0, 3).map(({ form }) => ({
            id: form.id,
            title: formSearchLabel(form) + " — " + form.title,
            detail: "Formular PDF completabil · " + form.institution,
            href: form.filePath,
            category: false,
            downloadName: form.downloadName,
            tooltip: form.applicability + " Deschide în Adobe Acrobat Reader desktop.",
          })),
        ]);
        setStatus("ready");
      } catch {
        if (current) setStatus("error");
      }
    }, 90);
    return () => {
      current = false;
      window.clearTimeout(timer);
    };
  }, [query, visible]);

  function navigate(href: string) {
    setOpen(false);
    router.push(href);
  }
  function submit(event?: FormEvent) {
    event?.preventDefault();
    const value = query.trim();
    navigate(value ? "/cautare?q=" + encodeURIComponent(value) : "/articole");
  }
  function onKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Escape") {
      setOpen(false);
      setActive(-1);
      return;
    }
    if (event.key === "ArrowDown" && status === "ready" && suggestions.length) {
      event.preventDefault();
      setOpen(true);
      setActive((previous) => (previous + 1) % suggestions.length);
    } else if (
      event.key === "ArrowUp" &&
      status === "ready" &&
      suggestions.length
    ) {
      event.preventDefault();
      setActive((previous) =>
        previous <= 0 ? suggestions.length - 1 : previous - 1,
      );
    } else if (
      event.key === "Enter" &&
      visible &&
      status === "ready" &&
      active >= 0 &&
      suggestions[active]
    ) {
      event.preventDefault();
      document.getElementById(listId + "-" + active)?.click();
    } else if (event.key === "Tab") {
      setOpen(false);
    }
  }

  return (
    <div
      ref={root}
      className={"search-root" + (compact ? " search-compact" : "")}
    >
      <form
        role="search"
        className={"search-form" + (visible ? " suggestions-open" : "")}
        onSubmit={submit}
      >
        <Search
          className="search-leading"
          size={23}
          strokeWidth={1.8}
          aria-hidden="true"
        />
        <label className="sr-only" htmlFor={"search-" + id}>
          Caută pe contab-online.ro
        </label>
        <input
          ref={input}
          id={"search-" + id}
          name="q"
          type="text"
          role="combobox"
          aria-autocomplete="list"
          aria-expanded={visible}
          aria-controls={visible ? listId : undefined}
          aria-activedescendant={
            visible && active >= 0 ? listId + "-" + active : undefined
          }
          autoComplete="off"
          spellCheck={false}
          minLength={2}
          maxLength={200}
          inputMode="search"
          placeholder="Întreabă orice despre contabilitate..."
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setOpen(true);
          }}
          onFocus={() => {
            setOpen(true);
            void getSearchProvider().catch(() => undefined);
          }}
          onKeyDown={onKeyDown}
        />
        {query ? (
          <button
            type="button"
            className="search-clear"
            aria-label="Șterge căutarea"
            onClick={() => {
              setQuery("");
              input.current?.focus();
            }}
          >
            <X size={17} />
          </button>
        ) : (
          <kbd className="search-shortcut">Ctrl K</kbd>
        )}
        <button
          type="submit"
          className="search-submit"
          aria-label="Caută în bibliotecă"
        >
          <span>Caută</span>
          <ArrowRight size={20} aria-hidden="true" />
        </button>
      </form>
      {visible ? (
        <div className="suggestions-panel">
          {status === "loading" ? (
            <div className="suggestions-message" role="status">
              <LoaderCircle className="spin" size={18} />
              Se caută în bibliotecă…
            </div>
          ) : null}
          {status === "error" ? (
            <div className="suggestions-message" role="alert">
              Sugestiile nu s-au încărcat. Reîncearcă sau deschide lista de
              articole.
            </div>
          ) : null}
          <ul id={listId} role="listbox" aria-label="Sugestii de căutare">
            {status === "ready"
              ? suggestions.map((item, index) => (
                  <li role="presentation" key={item.id}>
                  <a
                    id={listId + "-" + index}
                    role="option"
                    aria-selected={active === index}
                    tabIndex={-1}
                    href={item.href}
                    download={item.downloadName}
                    title={item.tooltip}
                    className={
                      "suggestion" + (active === index ? " is-active" : "")
                    }
                    onMouseEnter={() => setActive(index)}
                    onPointerDown={(event) => event.preventDefault()}
                    onClick={(event) => {
                      if (item.downloadName) {
                        setOpen(false);
                      } else if (!event.ctrlKey && !event.metaKey && !event.shiftKey && event.button === 0) {
                        event.preventDefault();
                        navigate(item.href);
                      }
                    }}
                  >
                    <span className="suggestion-symbol">
                      {item.downloadName ? (
                        <FileDown size={17} />
                      ) : item.category ? (
                        <ArrowUpRight size={17} />
                      ) : (
                        <Search size={17} />
                      )}
                    </span>
                    <div>
                      <span className="suggestion-title">
                        <Highlight text={item.title} query={query} />
                      </span>
                      <span className="suggestion-detail">
                        {item.category ? "Explorează categoria" : item.detail}
                      </span>
                    </div>
                    {item.downloadName ? <Download size={16} className="suggestion-arrow" aria-hidden="true" />
                      : <ArrowUpRight size={16} className="suggestion-arrow" aria-hidden="true" />}
                  </a>
                  </li>
                ))
              : null}
          </ul>
          {status === "ready" && !suggestions.length ? (
            <div className="suggestions-message">
              <SearchX size={20} />
              Nicio sugestie încă. Încearcă un termen mai general.
            </div>
          ) : null}
          {status === "ready" ? (
            <button
              type="button"
              className="suggestions-all"
              onClick={() => submit()}
            >
              <span>
                Vezi rezultatele pentru <strong>„{query.trim()}”</strong>
              </span>
              <CornerDownLeft size={17} aria-hidden="true" />
            </button>
          ) : null}
          <span className="sr-only" role="status">
            {status === "ready"
              ? suggestions.length +
                (suggestions.length === 1
                  ? " sugestie disponibilă. "
                  : " sugestii disponibile. ") +
                "Folosește săgețile pentru navigare."
              : ""}
          </span>
        </div>
      ) : null}
    </div>
  );
}
