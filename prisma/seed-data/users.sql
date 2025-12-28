--
-- PostgreSQL database dump
--

\restrict iQNf3PH6qH6ERCU4b5alj1eYZ3tfmbMCqI0NCG8Dzp5B7gdQrcUcfbFp9EYj46i

-- Dumped from database version 16.11
-- Dumped by pg_dump version 16.11

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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: User; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."User" (
    id uuid NOT NULL,
    email text NOT NULL,
    name text NOT NULL,
    role public."Role" NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    password text NOT NULL,
    "deletedAt" timestamp(3) without time zone
);


ALTER TABLE public."User" OWNER TO postgres;

--
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."User" (id, email, name, role, "createdAt", password, "deletedAt") FROM stdin;
a8b367f4-1470-41f2-8b58-492e98610f48	admin@admin.test	Admin	ADMIN	2025-12-28 12:08:40.84	$2b$10$vTH7C7l0xZtL775F9WwXCOSIzDfLr.g8k/bAF.6gQQyEIDSotKOmC	\N
3d973d16-ba37-4d0c-affa-704ced06c22e	student1@test.test	Student one	STUDENT	2025-12-28 12:09:02.887	$2b$10$cSSB4k5KpXVMqo/PAoFZS.JgexKF7cQtqVxYAF0BuBCpYBa1pXSlG	\N
8e98b85e-f136-4d5d-a7f3-3aac5da82060	student2@test.test	Student two	STUDENT	2025-12-28 12:09:09.695	$2b$10$P/OzjI7eG7Q0umF/muwTbOtop4SSfkqrc15ad3SbEtqvQ9KVWlZm2	\N
e41e39d0-36b9-4c4b-a9e1-76c51dcf9f67	student3@test.test	Student three	STUDENT	2025-12-28 12:09:17.949	$2b$10$x3ySsL7hqPJ75x1F0624ye2wO6EXV3TlZN1EF0zwJfe66H/kwR/jm	\N
f5ee4d92-e3cb-4fae-a612-c787d30bce58	student4@test.test	Student four	STUDENT	2025-12-28 12:09:27.721	$2b$10$eNtJqrYhHEp45yipsELcX.44H6bGs0PD.T0oPYWwmMueIJtnWoEMO	\N
5be2e7aa-222a-477c-b2d7-4fef3dfc2625	student5@test.test	Student five	STUDENT	2025-12-28 12:09:36.913	$2b$10$WCI8z/gT7r7mal451s6vj.e.y4gdnn5T/Gzdh.QpfCyRhV44iXAN6	\N
7e5283e5-10a7-45cd-b381-c5d18664b9d6	teacher1@test.test	Teacher one	TEACHER	2025-12-28 12:10:10.22	$2b$10$g2Mq8OHr9zyYS8PLi..jg.P12k1C9IE1r0tBIW0fEVpGM4Qq6ZEFi	\N
b01c66ef-8e2a-4a5d-b093-3bea85bfd4ff	teacher3@test.test	Teacher two	TEACHER	2025-12-28 12:10:16.431	$2b$10$K/psvf8RBexWyD6qP.oGfuhUqPNiv6U1hge1eyAJ8svLsbaNRmFVS	\N
cafd99a8-21ba-4f28-bc07-17f4559a353c	teacher4@test.test	Teacher four	TEACHER	2025-12-28 12:10:28.627	$2b$10$Khwvh9YSmacM3prEPWA2AOeGGFe7Wpem8jAAT80WEJjZVhUYalFf2	\N
3fafbb2a-9b0a-47d3-bb3d-37e0cf4e379e	librarian@test.test	Librarian one	ADMIN	2025-12-28 12:10:55.564	$2b$10$ugy3WiCCO/G.Pacby6e5AORM.WWinzPnbhxLpanGK/xL91rri1MnK	\N
a5a81165-0399-4325-9c29-54120a4d4164	headlibrarian@test.test	Head Librarian 	ADMIN	2025-12-28 12:11:09.954	$2b$10$R/QncGvsVVBlu1X/49i3zOECGHRLR1ekHJzzTvK2f.MRnIHvKeb.C	\N
\.


--
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);


--
-- Name: User_email_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "User_email_key" ON public."User" USING btree (email);


--
-- PostgreSQL database dump complete
--

\unrestrict iQNf3PH6qH6ERCU4b5alj1eYZ3tfmbMCqI0NCG8Dzp5B7gdQrcUcfbFp9EYj46i

