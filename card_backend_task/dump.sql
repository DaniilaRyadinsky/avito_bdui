--
-- PostgreSQL database dump
--

-- Dumped from database version 17.5 (Debian 17.5-1.pgdg120+1)
-- Dumped by pg_dump version 17.5 (Debian 17.5-1.pgdg120+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: cards; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.cards (
    id character varying(100) NOT NULL,
    title character varying(100) NOT NULL,
    price real NOT NULL,
    imageurl character varying(100) NOT NULL,
    isselected boolean NOT NULL,
    isfavorite boolean NOT NULL,
    quantity character varying(100) NOT NULL
);


ALTER TABLE public.cards OWNER TO postgres;

--
-- Name: schema_migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.schema_migrations (
    version bigint NOT NULL,
    dirty boolean NOT NULL
);


ALTER TABLE public.schema_migrations OWNER TO postgres;

--
-- Data for Name: cards; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.cards (id, title, price, imageurl, isselected, isfavorite, quantity) FROM stdin;
237ffe92-d36c-425b-902d-b2a29c79a4a6	Проворов фигма	14000	./images/provor.jpg	f	t	23
89402e32-e92c-4781-956e-495841d1080a	Проворов фигма2	14000	./images/provor.jpg	f	t	23
4564ebee-6c5a-445f-aceb-0a725d7f9e4f	Проворов фигма3	14000	./images/provor.jpg	f	t	23
799a25e4-e47f-49a5-8445-f4f92fe4f4eb	Проворов фигма4	14000	./images/provor.jpg	f	t	23
92bcec87-9e7c-4aee-938f-ea024c0907d4	Проворов фигма5	14000	./images/provor.jpg	f	t	23
\.


--
-- Data for Name: schema_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.schema_migrations (version, dirty) FROM stdin;
1	f
\.


--
-- Name: cards cards_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cards
    ADD CONSTRAINT cards_pkey PRIMARY KEY (id);


--
-- Name: cards cards_title_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cards
    ADD CONSTRAINT cards_title_key UNIQUE (title);


--
-- Name: schema_migrations schema_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.schema_migrations
    ADD CONSTRAINT schema_migrations_pkey PRIMARY KEY (version);


--
-- PostgreSQL database dump complete
--

