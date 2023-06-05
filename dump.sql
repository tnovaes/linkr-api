--
-- PostgreSQL database dump
--

-- Dumped from database version 13.9 (Ubuntu 13.9-1.pgdg20.04+1)
-- Dumped by pg_dump version 13.11 (Ubuntu 13.11-1.pgdg20.04+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

ALTER TABLE IF EXISTS ONLY public.likes DROP CONSTRAINT IF EXISTS fk_users;
ALTER TABLE IF EXISTS ONLY public.sessions DROP CONSTRAINT IF EXISTS fk_users;
ALTER TABLE IF EXISTS ONLY public.posts DROP CONSTRAINT IF EXISTS fk_users;
ALTER TABLE IF EXISTS ONLY public.hashtags_posts DROP CONSTRAINT IF EXISTS fk_posts;
ALTER TABLE IF EXISTS ONLY public.likes DROP CONSTRAINT IF EXISTS fk_posts;
ALTER TABLE IF EXISTS ONLY public.hashtags_posts DROP CONSTRAINT IF EXISTS fk_hashtags;
ALTER TABLE IF EXISTS ONLY public.users DROP CONSTRAINT IF EXISTS users_pkey;
ALTER TABLE IF EXISTS ONLY public.users DROP CONSTRAINT IF EXISTS unique_email;
ALTER TABLE IF EXISTS ONLY public.sessions DROP CONSTRAINT IF EXISTS sessions_pkey;
ALTER TABLE IF EXISTS ONLY public.posts DROP CONSTRAINT IF EXISTS posts_pkey;
ALTER TABLE IF EXISTS ONLY public.likes DROP CONSTRAINT IF EXISTS likes_pkey;
ALTER TABLE IF EXISTS ONLY public.hashtags_posts DROP CONSTRAINT IF EXISTS hashtags_posts_pkey;
ALTER TABLE IF EXISTS ONLY public.hashtags DROP CONSTRAINT IF EXISTS hashtags_pkey;
ALTER TABLE IF EXISTS public.users ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.sessions ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.posts ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.likes ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.hashtags_posts ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.hashtags ALTER COLUMN id DROP DEFAULT;
DROP SEQUENCE IF EXISTS public.users_id_seq;
DROP TABLE IF EXISTS public.users;
DROP SEQUENCE IF EXISTS public.sessions_id_seq;
DROP TABLE IF EXISTS public.sessions;
DROP SEQUENCE IF EXISTS public.posts_id_seq;
DROP TABLE IF EXISTS public.posts;
DROP SEQUENCE IF EXISTS public.likes_id_seq;
DROP TABLE IF EXISTS public.likes;
DROP SEQUENCE IF EXISTS public.hashtags_posts_id_seq;
DROP TABLE IF EXISTS public.hashtags_posts;
DROP SEQUENCE IF EXISTS public.hashtags_id_seq;
DROP TABLE IF EXISTS public.hashtags;
DROP SCHEMA IF EXISTS public;
--
-- Name: public; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA public;


--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON SCHEMA public IS 'standard public schema';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: hashtags; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.hashtags (
    id integer NOT NULL,
    name text NOT NULL
);


--
-- Name: hashtags_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.hashtags_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: hashtags_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.hashtags_id_seq OWNED BY public.hashtags.id;


--
-- Name: hashtags_posts; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.hashtags_posts (
    id integer NOT NULL,
    post_id integer,
    hashtag_id integer
);


--
-- Name: hashtags_posts_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.hashtags_posts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: hashtags_posts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.hashtags_posts_id_seq OWNED BY public.hashtags_posts.id;


--
-- Name: likes; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.likes (
    id integer NOT NULL,
    post_id integer,
    user_id integer
);


--
-- Name: likes_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.likes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: likes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.likes_id_seq OWNED BY public.likes.id;


--
-- Name: posts; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.posts (
    id integer NOT NULL,
    user_id integer NOT NULL,
    shared_link text NOT NULL,
    description text,
    created_at timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: posts_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.posts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: posts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.posts_id_seq OWNED BY public.posts.id;


--
-- Name: sessions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.sessions (
    id integer NOT NULL,
    token text NOT NULL,
    user_id integer NOT NULL
);


--
-- Name: sessions_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.sessions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: sessions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.sessions_id_seq OWNED BY public.sessions.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name text NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    avatar text
);


--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: hashtags id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.hashtags ALTER COLUMN id SET DEFAULT nextval('public.hashtags_id_seq'::regclass);


--
-- Name: hashtags_posts id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.hashtags_posts ALTER COLUMN id SET DEFAULT nextval('public.hashtags_posts_id_seq'::regclass);


--
-- Name: likes id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.likes ALTER COLUMN id SET DEFAULT nextval('public.likes_id_seq'::regclass);


--
-- Name: posts id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.posts ALTER COLUMN id SET DEFAULT nextval('public.posts_id_seq'::regclass);


--
-- Name: sessions id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions ALTER COLUMN id SET DEFAULT nextval('public.sessions_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: hashtags; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.hashtags VALUES (3, '#react');
INSERT INTO public.hashtags VALUES (4, '#techno');
INSERT INTO public.hashtags VALUES (5, '#anime');
INSERT INTO public.hashtags VALUES (6, '#dev');
INSERT INTO public.hashtags VALUES (7, '#learn');
INSERT INTO public.hashtags VALUES (8, '#node');
INSERT INTO public.hashtags VALUES (9, '#pomodoro');
INSERT INTO public.hashtags VALUES (10, '#gpt');
INSERT INTO public.hashtags VALUES (11, '#driven');
INSERT INTO public.hashtags VALUES (12, '#npm');
INSERT INTO public.hashtags VALUES (13, '#vercel');
INSERT INTO public.hashtags VALUES (14, '#render');
INSERT INTO public.hashtags VALUES (15, '#linkr');
INSERT INTO public.hashtags VALUES (16, '#shorts');
INSERT INTO public.hashtags VALUES (17, '#miami');
INSERT INTO public.hashtags VALUES (18, '#megasena');
INSERT INTO public.hashtags VALUES (19, '#sorteio');
INSERT INTO public.hashtags VALUES (20, '#porfavorfunciona');
INSERT INTO public.hashtags VALUES (21, '#hashtag');
INSERT INTO public.hashtags VALUES (22, '#PegaOPato');
INSERT INTO public.hashtags VALUES (23, '#brasil');
INSERT INTO public.hashtags VALUES (24, '#esportes');
INSERT INTO public.hashtags VALUES (25, '#NBA');
INSERT INTO public.hashtags VALUES (26, '#Pato');
INSERT INTO public.hashtags VALUES (27, '#FicaADica');
INSERT INTO public.hashtags VALUES (28, '#uberlandia');
INSERT INTO public.hashtags VALUES (29, '#VanceJoy');
INSERT INTO public.hashtags VALUES (30, '#google');


--
-- Data for Name: hashtags_posts; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.hashtags_posts VALUES (5, 4, 4);
INSERT INTO public.hashtags_posts VALUES (6, 5, 5);
INSERT INTO public.hashtags_posts VALUES (7, 6, 6);
INSERT INTO public.hashtags_posts VALUES (8, 6, 7);
INSERT INTO public.hashtags_posts VALUES (9, 7, 3);
INSERT INTO public.hashtags_posts VALUES (10, 8, 8);
INSERT INTO public.hashtags_posts VALUES (11, 9, 9);
INSERT INTO public.hashtags_posts VALUES (12, 10, 10);
INSERT INTO public.hashtags_posts VALUES (13, 11, 11);
INSERT INTO public.hashtags_posts VALUES (14, 12, 12);
INSERT INTO public.hashtags_posts VALUES (15, 13, 13);
INSERT INTO public.hashtags_posts VALUES (16, 14, 14);
INSERT INTO public.hashtags_posts VALUES (27, 22, 18);
INSERT INTO public.hashtags_posts VALUES (28, 22, 19);
INSERT INTO public.hashtags_posts VALUES (29, 18, 15);
INSERT INTO public.hashtags_posts VALUES (33, 41, 23);
INSERT INTO public.hashtags_posts VALUES (34, 41, 24);
INSERT INTO public.hashtags_posts VALUES (35, 42, 25);
INSERT INTO public.hashtags_posts VALUES (36, 42, 24);
INSERT INTO public.hashtags_posts VALUES (39, 45, 27);
INSERT INTO public.hashtags_posts VALUES (40, 45, 28);
INSERT INTO public.hashtags_posts VALUES (42, 49, 21);
INSERT INTO public.hashtags_posts VALUES (43, 49, 29);
INSERT INTO public.hashtags_posts VALUES (44, 50, 22);
INSERT INTO public.hashtags_posts VALUES (47, 52, 22);
INSERT INTO public.hashtags_posts VALUES (48, 52, 21);
INSERT INTO public.hashtags_posts VALUES (52, 56, 22);


--
-- Data for Name: likes; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.likes VALUES (1, NULL, 4);
INSERT INTO public.likes VALUES (2, NULL, 4);
INSERT INTO public.likes VALUES (12, 49, 4);
INSERT INTO public.likes VALUES (13, 50, 4);
INSERT INTO public.likes VALUES (15, 45, 4);
INSERT INTO public.likes VALUES (20, 52, 16);
INSERT INTO public.likes VALUES (23, 49, 16);
INSERT INTO public.likes VALUES (28, 22, 16);
INSERT INTO public.likes VALUES (29, 19, 16);
INSERT INTO public.likes VALUES (30, 50, 16);
INSERT INTO public.likes VALUES (31, 14, 16);
INSERT INTO public.likes VALUES (33, 23, 16);
INSERT INTO public.likes VALUES (38, 18, 16);
INSERT INTO public.likes VALUES (39, 56, 16);
INSERT INTO public.likes VALUES (40, 10, 4);
INSERT INTO public.likes VALUES (43, 52, 4);


--
-- Data for Name: posts; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.posts VALUES (2, 2, 'https://www.youtube.com/watch?v=ENOEyGnc2pw', 'Boiler Room', '2023-05-31 19:06:06.863397');
INSERT INTO public.posts VALUES (3, 2, 'https://www.playfulmag.com/post/heaven-is-a-dancefloor-full-off-cigarettes', 'Interview for Playful', '2023-06-01 21:22:56.397246');
INSERT INTO public.posts VALUES (4, 2, 'https://www.youtube.com/watch?v=O7s8PWlx9SY', 'Hor Berlin #techno', '2023-06-01 23:57:51.118976');
INSERT INTO public.posts VALUES (5, 3, 'https://www.youtube.com/watch?v=tkGnK7kV2wU', 'Fighting scene #anime', '2023-06-02 14:06:35.242638');
INSERT INTO public.posts VALUES (6, 13, 'https://developer.mozilla.org/en-US/', 'O MDN é demais #dev #learn', '2023-06-02 14:15:48.998143');
INSERT INTO public.posts VALUES (7, 13, 'https://www.w3schools.com/react/react_getstarted.asp', 'Já fizeram projetos com React? #react', '2023-06-02 14:16:37.267817');
INSERT INTO public.posts VALUES (8, 13, 'https://nodejs.org/en', 'O devinho usa Node.js e vocês? #node', '2023-06-02 14:17:11.253543');
INSERT INTO public.posts VALUES (9, 13, 'https://www.youtube.com/watch?v=qfUlcrFm-oU', 'O pato mais famoso da internet #pomodoro', '2023-06-02 14:17:48.837631');
INSERT INTO public.posts VALUES (10, 13, 'https://openai.com/blog/chatgpt', 'Visitem meu amigo Gepeto #gpt', '2023-06-02 14:18:35.625626');
INSERT INTO public.posts VALUES (11, 13, 'https://www.driven.com.br/', 'Vem aprender a programar! #driven', '2023-06-02 14:20:27.196803');
INSERT INTO public.posts VALUES (12, 13, 'https://www.npmjs.com/', 'Vocês já criaram uma lib própria? #npm', '2023-06-02 14:21:24.02058');
INSERT INTO public.posts VALUES (13, 13, 'https://vercel.com/', 'Qual site vocês fazem deploy de front? Eu uso #vercel', '2023-06-02 14:22:07.04975');
INSERT INTO public.posts VALUES (14, 13, 'https://render.com/', 'E pra API? Aqui é time #render', '2023-06-02 14:22:31.383539');
INSERT INTO public.posts VALUES (17, 11, 'https://github.com/tnovaes/linkr-api', 'Repositório do Back-end ', '2023-06-02 22:25:03.290234');
INSERT INTO public.posts VALUES (19, 12, 'https://maisesports.com.br/csgo-fallen-teria-pre-acordo-com-a-furia-aponta-rumor/', 'E ai, o professor vai de fúria?', '2023-06-03 01:45:38.324044');
INSERT INTO public.posts VALUES (22, 12, 'https://g1.globo.com/loterias/noticia/2023/06/03/mega-sena-pode-pagar-r-65-milhoes-neste-sabado.ghtml', 'vem ai #megasena #sorteio', '2023-06-03 03:11:17.439572');
INSERT INTO public.posts VALUES (23, 12, 'https://g1.globo.com/ciencia/noticia/2023/06/02/veja-como-foi-a-primeira-live-de-marte-feita-pela-agencia-espacial-europeia.ghtml', 'Ciencia!', '2023-06-03 03:13:16.339572');
INSERT INTO public.posts VALUES (41, 14, 'https://www.cbf.com.br/selecao-brasileira/noticias/selecao-base-masculina/brasil-da-adeus-ao-mundial-sub-20', 'Deu ruim! #brasil #esportes', '2023-06-04 16:23:35.143962');
INSERT INTO public.posts VALUES (42, 14, 'https://ge.globo.com/basquete/nba/noticia/2023/06/04/heat-x-nuggets-ao-vivo-na-nba-onde-assistir-ao-jogo-2-hoje-e-horario.ghtml', 'Bora verificar onde dá pra assistir galera! #NBA #esportes', '2023-06-04 16:25:22.514549');
INSERT INTO public.posts VALUES (45, 12, 'https://g1.globo.com/mg/triangulo-mineiro/noticia/2023/06/03/procon-em-uberlandia-tera-atendimento-presencial-suspenso-na-proxima-semana.ghtml', '#FicaADica #uberlandia', '2023-06-04 23:51:23.764475');
INSERT INTO public.posts VALUES (18, 11, 'https://github.com/tnovaes/linkr-front', 'Link do front #AgoraFoi #FoiMesmo', '2023-06-02 22:25:50.653162');
INSERT INTO public.posts VALUES (50, 11, 'https://www.youtube.com/shorts/9GKZSABI5CQ', '#PegaOPato #hashtag #Shorts', '2023-06-05 01:28:43.556775');
INSERT INTO public.posts VALUES (49, 11, 'https://www.youtube.com/watch?v=MsTWpbR_TVE', '#hashtag #VanceJoy', '2023-06-05 01:27:57.830301');
INSERT INTO public.posts VALUES (52, 11, 'https://www.youtube.com/watch?v=vZFes82DCFI&ab_channel=BiudoPiseiro', 'Pega o pato musica completa  #PegaOPato #hashtag ', '2023-06-05 01:42:43.603553');
INSERT INTO public.posts VALUES (56, 16, 'https://github.com/EDUSSBR', '#PegaOpAto', '2023-06-05 18:36:53.359393');


--
-- Data for Name: sessions; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.sessions VALUES (57, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjg1NTU4NDY5fQ.6vbaSM9CG8oGamEw5mDHhHNlfISuDXJIU9MUBrfIri0', 2);
INSERT INTO public.sessions VALUES (58, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiaWF0IjoxNjg1NTcyNDE4fQ.JYF_kuGr8AOb2hg4Qo89TuDKdEMtra9TPpK9Rfmx3Gc', 4);
INSERT INTO public.sessions VALUES (59, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiaWF0IjoxNjg1NTczMDY2fQ.X-maNw1rikCc8Pbk01xtZ9mdc8wxyZjCeEJedVGWjFM', 4);
INSERT INTO public.sessions VALUES (60, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTEsImlhdCI6MTY4NTY1NDIwNX0.G2Gq8d0M4iuxJdh0icnniHrUAWv_8VGTiSJJgVwD3yI', 11);
INSERT INTO public.sessions VALUES (61, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTEsImlhdCI6MTY4NTY1NDQ2OH0.qKaqihHbAT8XAtQWy8kPME9I8FwjhGISqPV8f3YzyN8', 11);
INSERT INTO public.sessions VALUES (62, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTEsImlhdCI6MTY4NTY1NDU4NX0.7bO_JXsAk7kedOBl_T0iwI2pzkBXM4POpga3Et4bGi4', 11);
INSERT INTO public.sessions VALUES (63, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIsImlhdCI6MTY4NTY1NzczNH0.RkelDmdILgkwzJQQro9sew0_W0j3KlzTXc3N8U8LbmI', 12);
INSERT INTO public.sessions VALUES (64, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTEsImlhdCI6MTY4NTY3MzEyNX0.cNvJVGFY36ArfrYf4W98O9CK2IVfwOO_hz-7lu06lE0', 11);
INSERT INTO public.sessions VALUES (68, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTMsImlhdCI6MTY4NTcxNTI3OX0.X3l6SL16nF6UdJHhKXABgLkVTrztV4r6tEJfAz6hXUA', 13);
INSERT INTO public.sessions VALUES (69, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiaWF0IjoxNjg1NzI2NTY0fQ.L9JVs12hJqJdyshvclk71liX5kMpcaYGii0driM_zrQ', 4);
INSERT INTO public.sessions VALUES (71, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTEsImlhdCI6MTY4NTc0MzkyN30.0pfxtfH1W6mApxIcaamwPjQ4STCQ4SKR1n_P9SukNLE', 11);
INSERT INTO public.sessions VALUES (72, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTEsImlhdCI6MTY4NTc1NTIzNn0.tCuG1sHPuKvkMNo1QTL3WVpCpLYQ_TWo8yL8W_UX-78', 11);
INSERT INTO public.sessions VALUES (73, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIsImlhdCI6MTY4NTc1NTU0Nn0.brwDAoRLiVZoms1xATxs9P5lkHebcF06-6BHLj8-tHE', 12);
INSERT INTO public.sessions VALUES (74, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTEsImlhdCI6MTY4NTc1NTc4Nn0.j9_kOpS_cUFCw5jf6JGHhQ3cm5u6j8Rb2jNx6FiX68Y', 11);
INSERT INTO public.sessions VALUES (75, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTEsImlhdCI6MTY4NTc1NjQ5M30.dxTlFXajsBcbf8I1EzASmShiJc8kicWsMr1hKXtttc8', 11);
INSERT INTO public.sessions VALUES (76, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTEsImlhdCI6MTY4NTc1NjYxMn0.glkDARKOtsduN4JzRFtvDNCP3iccpsloxpfqWRslQ3g', 11);
INSERT INTO public.sessions VALUES (77, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIsImlhdCI6MTY4NTc1NjY2OH0.iw3e5eMJESZDogzDcQbzZ5s5aneVPtTLUXIJDveyhoc', 12);
INSERT INTO public.sessions VALUES (78, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTEsImlhdCI6MTY4NTc2Mzg5NX0.-kjGEJG0ctWx6Sv6_giSqww0Uq_JluzOi24Ilso3n6Y', 11);
INSERT INTO public.sessions VALUES (79, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTQsImlhdCI6MTY4NTg4NzU5N30.ib5g-DHv4ccp_Rt3Xp_6WF0HgEeixiADEAkzvkyAAf4', 14);
INSERT INTO public.sessions VALUES (80, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiaWF0IjoxNjg1ODk2NTk1fQ.U4ntqsaYds98t0HiPXnZ1dEug5HQjQuCfUbxkkbiyJs', 4);
INSERT INTO public.sessions VALUES (81, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIsImlhdCI6MTY4NTg5OTY5OX0.aNTtBoAaHN6PsxgKD5A7BJwI8Ak8NViUKzGJgPMdR90', 12);
INSERT INTO public.sessions VALUES (82, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTEsImlhdCI6MTY4NTg5OTgwMn0.4GTKIjLcEB9A9Owvlalm28owumyzD2OqdHkA52eLoTY', 11);
INSERT INTO public.sessions VALUES (83, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTEsImlhdCI6MTY4NTkzMTM5MX0.8qwKpdnWNn-rJA5RV1NH7QwimbICPU_-i6RlOc2jfxk', 11);
INSERT INTO public.sessions VALUES (84, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTQsImlhdCI6MTY4NTk0MTUxNH0.prLSMWrOoSKhMZzU7iVdmqFMHcvP7OmXkWAVi36IMzU', 14);
INSERT INTO public.sessions VALUES (85, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjg1OTcwNzY5fQ.vOI2MlN_ynTBUk92rf31XCNYR05A6IZsL5q-xgwuE-M', 2);
INSERT INTO public.sessions VALUES (86, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjg1OTcxMTk2fQ.Usv0A34tBqWWQMrMLX08Ldqo9tpi8ttz1htIYS82Av0', 2);
INSERT INTO public.sessions VALUES (87, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUsImlhdCI6MTY4NTk4NjQyOH0.JkJ2DOVE9f7u7y9ILtxQ_l5aH4eNm-bF9IzKrTxR914', 15);
INSERT INTO public.sessions VALUES (88, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjg1OTg2NzI2fQ.0m5NN8GndO-m01EscWeSRD65SCMVKWRKdyaKlnxr3nM', 2);
INSERT INTO public.sessions VALUES (93, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTYsImlhdCI6MTY4NTk5MTY5N30.IOAPVxnwZffmOE_DlUCX2uel6IOtqk-j52faL5z_v8E', 16);
INSERT INTO public.sessions VALUES (94, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiaWF0IjoxNjg1OTkxNzU4fQ.RNVrL1SBezFGZnH65awfFT-pH_dT7jXWL46sLSWkZ-I', 4);
INSERT INTO public.sessions VALUES (95, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiaWF0IjoxNjg1OTkzNDg2fQ.Jg-0hia2e-A3XVFNh5hgstMqIXvu-HCrXNkV364SmFE', 4);
INSERT INTO public.sessions VALUES (97, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjg1OTkzNzMxfQ.Q5DFDdEh9ITM7BEfkpVnlQ7vmngm4CAogRtKeK7aEuM', 2);
INSERT INTO public.sessions VALUES (98, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiaWF0IjoxNjg1OTk1NjIwfQ.Gyksik3Hl26bjey4ldfMrPsQrMTM2OHI8w0ONd9OpP4', 4);


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.users VALUES (1, 'Eduardo', 'ehhehe@hehe.com', 'jejej', NULL);
INSERT INTO public.users VALUES (2, 'Clara Cuvé', 'claracuve@linkr.com', '$2b$10$s0pl40VmDU4qKg9CRLOFte/TdeiaLbXkKtsuMCHgNA2kwFGEJR21C', 'https://static.ra.co/images/profiles/lg/claracuve.jpg?dateUpdated=1527719900000');
INSERT INTO public.users VALUES (3, 'itachi', 'itachi@linkr.com', '$2b$10$gX5vJbnUUlKzXt4hSTYYpOWyBhmr2jQgE8h.yybYMk2CWbYh8HuWi', 'https://ovicio.com.br/wp-content/uploads/2020/10/20201007-naruto-itachi-uchiha-anime-tribute-1239755-1280x0-1.jpeg');
INSERT INTO public.users VALUES (4, 'Edu', 'bls.dudu@gmail.com', '$2b$10$XCpM7hVC8Om71yHxQdQjKu.AJD9QRb44pxWw5dGRcxRGpuGw9C2Y.', 'https://i.imgur.com/bCIJ0DJ.png');
INSERT INTO public.users VALUES (11, 'lukas', 'lucas123@email.com', '$2b$10$CFQ7BQ/cbPIw6oJgnSE8SOy6AgT3auIFxjHl/ihlg1Fi.Rf.6Sx.S', 'https://metagalaxia.com.br/wp-content/uploads/2022/09/Monkey-D-Luffy-One-Piece.webp');
INSERT INTO public.users VALUES (12, 'anarehder', 'ana@ana.com.br', '$2b$10$vfbrz/joVeufCAFUMut4jO2mulczsW.Rs9GFt7B.Gs.ZRdhN2nmn.', 'https://img.freepik.com/fotos-premium/urso-panda-bebe-fofo-com-olhos-grandes-renderizacao-3d-ilustracao-dos-desenhos-animados_691560-4917.jpg');
INSERT INTO public.users VALUES (13, 'devinho', 'devinho@linkr.com', '$2b$10$4A4s8D9kDuMrqoklwyMglu18uEFx74Az8leJKX3.1peW5M8rxILHa', 'https://cdn-icons-png.flaticon.com/512/6840/6840478.png');
INSERT INTO public.users VALUES (14, 'babyDavi', 'davi@davi.com.br', '$2b$10$nmiSIMFNV6NxEWRbVYAijOPdihb2XfloMPAIi2UnLtt7XC22SsBDq', 'https://festasquebragalho.com.br/wp-content/uploads/2022/10/poderoso-chefinho-1.jpg');
INSERT INTO public.users VALUES (15, 'Conta de Teste', 'teste@linkr.com', '$2b$10$ZqbgH18/rs.6CwE7Lg9SQ.gURHegX3kdVGZtSAeJNVRjAf88EE7dK', 'https://static.vecteezy.com/system/resources/previews/013/042/571/original/default-avatar-profile-icon-social-media-user-photo-in-flat-style-vector.jpg');
INSERT INTO public.users VALUES (16, 'Bruna', 'hehehe@hehe.com', '$2b$10$PUwZX8.oOybisVbwdAQOU.ik95z0W/vwCWANgXD.jquLQl2DHVj4q', 'https://i0.wp.com/newdoorfiji.com/wp-content/uploads/2018/03/profile-img-1.jpg?ssl=1');


--
-- Name: hashtags_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.hashtags_id_seq', 30, true);


--
-- Name: hashtags_posts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.hashtags_posts_id_seq', 52, true);


--
-- Name: likes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.likes_id_seq', 48, true);


--
-- Name: posts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.posts_id_seq', 56, true);


--
-- Name: sessions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.sessions_id_seq', 98, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.users_id_seq', 16, true);


--
-- Name: hashtags hashtags_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.hashtags
    ADD CONSTRAINT hashtags_pkey PRIMARY KEY (id);


--
-- Name: hashtags_posts hashtags_posts_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.hashtags_posts
    ADD CONSTRAINT hashtags_posts_pkey PRIMARY KEY (id);


--
-- Name: likes likes_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.likes
    ADD CONSTRAINT likes_pkey PRIMARY KEY (id);


--
-- Name: posts posts_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT posts_pkey PRIMARY KEY (id);


--
-- Name: sessions sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_pkey PRIMARY KEY (id);


--
-- Name: users unique_email; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT unique_email UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: hashtags_posts fk_hashtags; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.hashtags_posts
    ADD CONSTRAINT fk_hashtags FOREIGN KEY (hashtag_id) REFERENCES public.hashtags(id);


--
-- Name: likes fk_posts; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.likes
    ADD CONSTRAINT fk_posts FOREIGN KEY (post_id) REFERENCES public.posts(id);


--
-- Name: hashtags_posts fk_posts; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.hashtags_posts
    ADD CONSTRAINT fk_posts FOREIGN KEY (post_id) REFERENCES public.posts(id);


--
-- Name: posts fk_users; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT fk_users FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: sessions fk_users; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT fk_users FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: likes fk_users; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.likes
    ADD CONSTRAINT fk_users FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- PostgreSQL database dump complete
--

