--
-- PostgreSQL database dump
--

-- Dumped from database version 17.0
-- Dumped by pg_dump version 17.0

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

--
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


--
-- Name: appointment_status_enum; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.appointment_status_enum AS ENUM (
    'PENDING',
    'CONFIRMED',
    'CANCELED',
    'RESCHEDULED',
    'IN_PROGRESS',
    'COMPLETED',
    'NO_SHOW'
);


ALTER TYPE public.appointment_status_enum OWNER TO postgres;

--
-- Name: users_role_enum; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.users_role_enum AS ENUM (
    'patient',
    'professional',
    'admin'
);


ALTER TYPE public.users_role_enum OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: appointment; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.appointment (
    id integer NOT NULL,
    date character varying NOT NULL,
    description character varying NOT NULL,
    status public.appointment_status_enum DEFAULT 'PENDING'::public.appointment_status_enum NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    "patientId" integer,
    "professionalId" integer
);


ALTER TABLE public.appointment OWNER TO postgres;

--
-- Name: appointment_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.appointment_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.appointment_id_seq OWNER TO postgres;

--
-- Name: appointment_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.appointment_id_seq OWNED BY public.appointment.id;


--
-- Name: email_templates; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.email_templates (
    id integer NOT NULL,
    name character varying NOT NULL,
    subject character varying NOT NULL,
    "htmlContent" text NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.email_templates OWNER TO postgres;

--
-- Name: email_templates_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.email_templates_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.email_templates_id_seq OWNER TO postgres;

--
-- Name: email_templates_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.email_templates_id_seq OWNED BY public.email_templates.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    "firstName" character varying(100) NOT NULL,
    "lastName" character varying(100),
    email character varying,
    whatsapp character varying,
    username character varying(100),
    password character varying,
    birthdate character varying(100),
    "nDni" character varying(100),
    image character varying DEFAULT 'https://bit.ly/fgpImg1'::character varying,
    role public.users_role_enum DEFAULT 'patient'::public.users_role_enum NOT NULL,
    title character varying(255),
    specialization character varying(255),
    bio character varying(1000),
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: appointment id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.appointment ALTER COLUMN id SET DEFAULT nextval('public.appointment_id_seq'::regclass);


--
-- Name: email_templates id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.email_templates ALTER COLUMN id SET DEFAULT nextval('public.email_templates_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: appointment; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.appointment (id, date, description, status, "createdAt", "patientId", "professionalId") FROM stdin;
1	2024-12-03T19:47:48.563Z	Sesión de rehabilitación postoperatoria de rodilla	PENDING	2024-12-03 14:47:48.584358	1	9
2	2024-12-03T19:47:48.563Z	Tratamiento para dolor lumbar crónico con técnicas de terapia manual	PENDING	2024-12-03 14:47:48.599242	2	10
3	2024-12-03T19:47:48.563Z	Ejercicios de fortalecimiento para esguince de tobillo	PENDING	2024-12-03 14:47:48.612194	3	10
4	2024-12-04T19:47:48.563Z	Sesión de electroterapia para alivio del dolor en hombro	PENDING	2024-12-03 14:47:48.625366	4	8
5	2024-12-04T19:47:48.563Z	Estiramientos y masajes para contractura muscular en cuello	PENDING	2024-12-03 14:47:48.638079	5	9
6	2024-12-04T19:47:48.563Z	Revisión de progreso en tratamiento de fascitis plantar	PENDING	2024-12-03 14:47:48.649362	6	10
7	2024-12-06T19:47:48.563Z	Terapia de rehabilitación después de fractura de brazo	PENDING	2024-12-03 14:47:48.662719	7	8
8	2024-12-06T19:47:48.563Z	Ejercicios de movilidad para mejorar rango articular en rodilla	PENDING	2024-12-03 14:47:48.675456	1	10
9	2024-12-06T19:47:48.563Z	Plan de fortalecimiento muscular para prevención de lesiones	PENDING	2024-12-03 14:47:48.687087	2	10
10	2024-12-09T19:47:48.563Z	Consulta de control postoperatorio de rodilla	PENDING	2024-12-03 14:47:48.698308	3	8
11	2024-12-09T19:47:48.563Z	Tratamiento de masajes terapéuticos para cuello	PENDING	2024-12-03 14:47:48.709257	4	9
12	2024-12-11T19:47:48.563Z	Rehabilitación para esguince de tobillo	PENDING	2024-12-03 14:47:48.7223	5	10
13	2024-12-11T19:47:48.563Z	Evaluación de progreso en tratamiento de fascitis plantar	PENDING	2024-12-03 14:47:48.734247	6	8
14	2024-12-12T19:47:48.563Z	Ejercicios de fortalecimiento para la parte inferior de la espalda	PENDING	2024-12-03 14:47:48.745557	7	9
15	2024-12-12T19:47:48.563Z	Terapia de rehabilitación para fractura de brazo	PENDING	2024-12-03 14:47:48.756587	1	10
16	2024-12-12T19:47:48.563Z	Consulta de control postoperatorio de rodilla	PENDING	2024-12-03 14:47:48.770253	2	8
17	2024-12-12T19:47:48.563Z	Tratamiento de masajes terapéuticos para cuello	PENDING	2024-12-03 14:47:48.783245	3	10
18	2024-12-03T14:00:00.000Z	Terapia de rehabilitación para fractura de brazo	PENDING	2024-12-03 15:10:33.187783	3	7
19	2024-12-11T15:00:00.000Z	Terapia de rehabilitación para fractura de brazo	PENDING	2024-12-03 16:00:07.638234	1	10
\.


--
-- Data for Name: email_templates; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.email_templates (id, name, subject, "htmlContent", "createdAt") FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, "firstName", "lastName", email, whatsapp, username, password, birthdate, "nDni", image, role, title, specialization, bio, "createdAt") FROM stdin;
1	Lionel	Messi	lionel.messi@cliniccare.com	+5491123456790	patient_lionel	$2b$10$tJbIXFfupzWAS/bpOy7wOO2nGZVOuLCbceTzujm9sa9ya2brnQdaa	1987-06-24	27894561	https://bit.ly/fgpImg1	patient	\N	\N	\N	2024-12-03 14:47:48.498742
2	Frida	Kahlo	frida.kahlo@cliniccare.com	+5491123456791	patient_frida	$2b$10$tJbIXFfupzWAS/bpOy7wOO2nGZVOuLCbceTzujm9sa9ya2brnQdaa	1907-07-06	29123847	https://bit.ly/fgpImg1	patient	\N	\N	\N	2024-12-03 14:47:48.509545
3	Albert	Einstein	albert.einstein@cliniccare.com	+5491123456792	patient_albert	$2b$10$tJbIXFfupzWAS/bpOy7wOO2nGZVOuLCbceTzujm9sa9ya2brnQdaa	1879-03-14	30456789	https://bit.ly/fgpImg1	patient	\N	\N	\N	2024-12-03 14:47:48.515718
4	Marie	Curie	marie.curie@cliniccare.com	+5491123456793	patient_marie	$2b$10$tJbIXFfupzWAS/bpOy7wOO2nGZVOuLCbceTzujm9sa9ya2brnQdaa	1867-11-07	29012345	https://bit.ly/fgpImg1	patient	\N	\N	\N	2024-12-03 14:47:48.520168
5	Serena	Williams	serena.williams@cliniccare.com	+5491123456794	patient_serena	$2b$10$tJbIXFfupzWAS/bpOy7wOO2nGZVOuLCbceTzujm9sa9ya2brnQdaa	1981-09-26	30234567	https://bit.ly/fgpImg1	patient	\N	\N	\N	2024-12-03 14:47:48.524913
6	Pablo	Picasso	pablo.picasso@cliniccare.com	+5491123456795	patient_pablo	$2b$10$tJbIXFfupzWAS/bpOy7wOO2nGZVOuLCbceTzujm9sa9ya2brnQdaa	1881-10-25	30123456	https://bit.ly/fgpImg1	patient	\N	\N	\N	2024-12-03 14:47:48.531679
7	Malala	Yousafzai	malala.yousafzai@cliniccare.com	+5491123456796	patient_malala	$2b$10$tJbIXFfupzWAS/bpOy7wOO2nGZVOuLCbceTzujm9sa9ya2brnQdaa	1997-07-12	30012345	https://bit.ly/fgpImg1	patient	\N	\N	\N	2024-12-03 14:47:48.535875
8	Hipócrates	de Kos	hippocrates.kos@cliniccare.com	+5491123456802	profesional_hipocrates	$2b$10$tJbIXFfupzWAS/bpOy7wOO2nGZVOuLCbceTzujm9sa9ya2brnQdaa	460 AC	29543218	https://i.postimg.cc/nchWgyY7/01.jpg	professional	Doctor	Medicina General	Considerado el padre de la medicina, Hipócrates sentó las bases de la ética y las prácticas médicas modernas.	2024-12-03 14:47:48.539729
9	Jane	Goodall	jane.goodall@cliniccare.com	+5491123456804	profesional_jane	$2b$10$tJbIXFfupzWAS/bpOy7wOO2nGZVOuLCbceTzujm9sa9ya2brnQdaa	1934-04-03	32547890	https://i.postimg.cc/HW2KSY5d/02.jpg	professional	Licenciada	Primatología	La Dra. Jane Goodall es reconocida por su investigación innovadora sobre chimpancés y su defensa de la conservación.	2024-12-03 14:47:48.545057
10	Sigmund	Freud	sigmund.freud@cliniccare.com	+5491123456803	profesional_sigmund	$2b$10$tJbIXFfupzWAS/bpOy7wOO2nGZVOuLCbceTzujm9sa9ya2brnQdaa	1856-05-06	29304567	https://i.postimg.cc/ZnVM0HZC/03.jpg	professional	Doctor	Psicoanálisis	El pionero del psicoanálisis, Freud revolucionó la comprensión de la psicología y el comportamiento humano.	2024-12-03 14:47:48.551586
11	Valeria	Silva	valeria.silva@cliniccare.com	+5491123456804	profesional_valeria	$2b$10$tJbIXFfupzWAS/bpOy7wOO2nGZVOuLCbceTzujm9sa9ya2brnQdaa	1993-02-14	32547890	https://i.postimg.cc/HW2KSY5d/02.jpg	professional	Licenciada	Kinesiología Pediátrica	La Licenciada Silva Valeria cuenta con una sólida experiencia en kinesiología pediátrica, ayudando a niños a superar dificultades físicas y mejorar su calidad de vida. Su pasión y empatía destacan en cada tratamiento.	2024-12-03 14:47:48.556333
12	Admin	ClinicCare	admin@cliniccare.com	+5491123456805	admin	$2b$10$tJbIXFfupzWAS/bpOy7wOO2nGZVOuLCbceTzujm9sa9ya2brnQdaa	2022-01-01	30000000	https://i.postimg.cc/1tF2NNNy/03.jpg	admin	Administrador	Psicoanálisis	El pionero del psicoanálisis, Freud revolucionó la comprensión de la psicología y el comportamiento humano.	2024-12-03 14:47:48.560406
\.


--
-- Name: appointment_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.appointment_id_seq', 19, true);


--
-- Name: email_templates_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.email_templates_id_seq', 1, false);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 12, true);


--
-- Name: email_templates PK_06c564c515d8cdb40b6f3bfbbb4; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.email_templates
    ADD CONSTRAINT "PK_06c564c515d8cdb40b6f3bfbbb4" PRIMARY KEY (id);


--
-- Name: users PK_a3ffb1c0c8416b9fc6f907b7433; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY (id);


--
-- Name: appointment PK_e8be1a53027415e709ce8a2db74; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.appointment
    ADD CONSTRAINT "PK_e8be1a53027415e709ce8a2db74" PRIMARY KEY (id);


--
-- Name: appointment FK_1efb8063ad19e9e3f9157219033; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.appointment
    ADD CONSTRAINT "FK_1efb8063ad19e9e3f9157219033" FOREIGN KEY ("professionalId") REFERENCES public.users(id);


--
-- Name: appointment FK_5ce4c3130796367c93cd817948e; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.appointment
    ADD CONSTRAINT "FK_5ce4c3130796367c93cd817948e" FOREIGN KEY ("patientId") REFERENCES public.users(id);


--
-- PostgreSQL database dump complete
--

