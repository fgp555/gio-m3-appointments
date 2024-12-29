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
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: appointment; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.appointment (id, date, description, status, "createdAt", "patientId", "professionalId") FROM stdin;
1	2024-12-01T20:00:00.000Z	Tratamiento para dolor lumbar crónico con técnicas de terapia manual	PENDING	2024-12-01 17:54:15.881566	1	2
2	2024-12-01T16:00:00.000Z	Ejercicios de fortalecimiento para esguince de tobillo	PENDING	2024-12-01 17:54:15.893094	1	2
3	2024-12-01T14:00:00.000Z	Revisión de progreso en tratamiento de fascitis plantar	PENDING	2024-12-01 17:54:15.905322	1	2
4	2024-12-01T21:00:00.000Z	Plan de fortalecimiento muscular para prevención de lesiones	PENDING	2024-12-01 17:54:15.916695	1	2
5	2024-12-02T18:00:00.000Z	Revisión de progreso en tratamiento de fascitis plantar	PENDING	2024-12-01 17:54:15.926468	1	2
6	2024-12-02T15:00:00.000Z	Estiramientos y masajes para contractura muscular en cuello	PENDING	2024-12-01 17:54:15.937299	1	2
7	2024-12-02T16:00:00.000Z	Revisión de progreso en tratamiento de fascitis plantar	PENDING	2024-12-01 17:54:15.948147	1	2
8	2024-12-02T22:00:00.000Z	Tratamiento para dolor lumbar crónico con técnicas de terapia manual	PENDING	2024-12-01 17:54:15.958571	1	2
9	2024-12-09T19:00:00.000Z	Sesión de electroterapia para alivio del dolor en hombro	PENDING	2024-12-01 17:54:15.97155	2	3
10	2024-12-09T16:00:00.000Z	Sesión de rehabilitación postoperatoria de rodilla	PENDING	2024-12-01 17:54:15.98093	2	3
11	2024-12-16T20:00:00.000Z	Sesión de electroterapia para alivio del dolor en hombro	PENDING	2024-12-01 17:54:15.991357	2	3
12	2024-12-16T22:00:00.000Z	Estiramientos y masajes para contractura muscular en cuello	PENDING	2024-12-01 17:54:16.003124	2	3
13	2024-12-17T18:00:00.000Z	Sesión de rehabilitación postoperatoria de rodilla	PENDING	2024-12-01 17:54:16.013394	2	3
14	2024-12-17T19:00:00.000Z	Terapia de rehabilitación después de fractura de brazo	PENDING	2024-12-01 17:54:16.024629	2	3
15	2024-12-17T16:00:00.000Z	Ejercicios de movilidad para mejorar rango articular en rodilla	PENDING	2024-12-01 17:54:16.035769	2	3
16	2024-12-17T22:00:00.000Z	Sesión de electroterapia para alivio del dolor en hombro	PENDING	2024-12-01 17:54:16.045377	2	3
17	2024-12-18T21:00:00.000Z	Tratamiento de terapia física para recuperación post-quirúrgica de codo	PENDING	2024-12-01 17:54:16.057202	2	3
18	2024-12-18T14:00:00.000Z	Revisión de progreso en tratamiento de fascitis plantar	PENDING	2024-12-01 17:54:16.073821	2	3
19	2024-12-18T20:00:00.000Z	Sesión de rehabilitación postoperatoria de rodilla	PENDING	2024-12-01 17:54:16.087028	2	3
20	2024-12-23T15:00:00.000Z	Plan de fortalecimiento muscular para prevención de lesiones	PENDING	2024-12-01 17:54:16.097346	3	1
21	2024-12-23T16:00:00.000Z	Tratamiento de terapia física para recuperación post-quirúrgica de codo	PENDING	2024-12-01 17:54:16.106749	3	1
22	2024-12-24T18:00:00.000Z	Tratamiento de terapia física para recuperación post-quirúrgica de codo	PENDING	2024-12-01 17:54:16.117881	3	1
23	2024-12-24T19:00:00.000Z	Sesión de electroterapia para alivio del dolor en hombro	PENDING	2024-12-01 17:54:16.130505	3	1
24	2024-12-24T22:00:00.000Z	Tratamiento para dolor lumbar crónico con técnicas de terapia manual	PENDING	2024-12-01 17:54:16.143465	3	1
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, "firstName", "lastName", email, whatsapp, username, password, birthdate, "nDni", image, role, title, specialization, bio, "createdAt") FROM stdin;
1	María Fernanda	Fernández García	maria.fernandez@cliniccare.com	+5491123456790	patient_maria	SecurePass@2023	1992-05-22	27894561	https://bit.ly/fgpImg1	patient	\N	\N	\N	2024-12-01 17:54:15.813727
2	Pedro Javier	Ramírez Gómez	pedro.ramirez@cliniccare.com	+5491123456791	patient_pedro	SecurePass@2023	1988-11-03	29123847	https://bit.ly/fgpImg1	patient	\N	\N	\N	2024-12-01 17:54:15.824106
3	Laura Isabel	Gómez Pérez	laura.gomez@cliniccare.com	+5491123456792	patient_laura	SecurePass@2023	1995-09-15	30456789	https://bit.ly/fgpImg1	patient	\N	\N	\N	2024-12-01 17:54:15.827424
4	Carlos Eduardo	López Rodríguez	carlos.lopez@cliniccare.com	+5491123456793	patient_carlos	SecurePass@2023	1990-03-07	29012345	https://bit.ly/fgpImg1	patient	\N	\N	\N	2024-12-01 17:54:15.830792
5	Sofía	Gómez Rodríguez	sofia.gomez@cliniccare.com	+5491123456794	patient_sofia	SecurePass@2023	1998-07-12	30234567	https://bit.ly/fgpImg1	patient	\N	\N	\N	2024-12-01 17:54:15.836853
6	Javier	Gómez Rodríguez	javier.gomez@cliniccare.com	+5491123456795	patient_javier	SecurePass@2023	1997-06-09	30123456	https://bit.ly/fgpImg1	patient	\N	\N	\N	2024-12-01 17:54:15.840375
7	Marta	Gómez Rodríguez	marta.gomez@cliniccare.com	+5491123456796	patient_marta	SecurePass@2023	1996-05-08	30012345	https://bit.ly/fgpImg1	patient	\N	\N	\N	2024-12-01 17:54:15.843712
8	Matías	Rodríguez	matias.rodriguez@cliniccare.com	+5491123456796	professional_matias	SecurePass@2023	1982-04-10	30765432	https://i.postimg.cc/nchWgyY7/01.jpg	professional	Licenciado	Rehabilitación Deportiva	Licenciado Rodríguez Matías se especializa en la rehabilitación de lesiones deportivas. Con su enfoque personalizado y su compromiso con la excelencia, ayuda a deportistas a recuperarse y mejorar su rendimiento.	2024-12-01 17:54:15.851478
9	Natali	M R	natali@cliniccare.com	+5491123456797	professional_giovanna	SecurePass@2023	1985-08-30	28675431	https://i.postimg.cc/HW2KSY5d/02.jpg	professional	Licenciada	RPG, Drenaje Linfático y Pilates	Licenciada Martínez Russo Giovanna cuenta con experiencia en Reeducación Postural Global (RPG), drenaje linfático y Pilates. Su dedicación y conocimientos avanzados en estas áreas son fundamentales para nuestro equipo.	2024-12-01 17:54:15.85516
10	Gonzalo	Rodríguez	gonzalo.rodriguez@cliniccare.com	+5491123456798	professional_gonzalo	SecurePass@2023	1980-12-15	28564321	https://i.postimg.cc/ZnVM0HZC/03.jpg	professional	Licenciado	Osteopatía	Licenciado Rodríguez Gonzalo es experto en osteopatía, utilizando técnicas avanzadas para tratar diversas condiciones musculoesqueléticas. Su enfoque holístico y su pasión por el bienestar del paciente aseguran tratamientos efectivos y una pronta recuperación.	2024-12-01 17:54:15.858673
11	Luis Admin	Martínez López	admin@cliniccare.com	+5491123456789	admin_luis	SecurePass@2023	1985-07-15	30123456	https://bit.ly/fgpImg1	admin	\N	\N	\N	2024-12-01 17:54:15.861618
\.


--
-- Name: appointment_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.appointment_id_seq', 26, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 11, true);


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

