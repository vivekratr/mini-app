-- drop table if it exists
DROP TABLE IF EXISTS products CASCADE;
DROP TABLE IF EXISTS content CASCADE;
DROP TABLE IF EXISTS users CASCADE;
-- create user table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    role VARCHAR(50) DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- create content table for multilingual text 
CREATE TABLE content (
    id SERIAL PRIMARY KEY,
    page VARCHAR(50) NOT NULL,
    language VARCHAR(5) NOT NULL,
    text JSONB NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(page, language)
);
-- create table for pricelist 
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    article_no INTEGER NOT NULL UNIQUE,
    "product/service" TEXT NOT Null,
    in_price INTEGER NOT NULL,
    price INTEGER NOT NULL,
    unit TEXT,
    in_stock INTEGER,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
-- insert multilingual content for login page
INSERT INTO content (page, language, text)
VALUES (
        'login',
        'en',
        '{"title": "Login", "username": "Username", "password": "Password", "submit": "Sign In", "welcome": "Welcome to 123Fakturera"}'
    ),
    (
        'login',
        'sv',
        '{"title": "Logga in", "username": "Användarnamn", "password": "Lösenord", "submit": "Logga in", "welcome": "Välkommen till 123Fakturera"}'
    );
INSERT INTO content (page, language, text)
VALUES (
        'navbar',
        'en',
        '{"home": "Home", "order": "Order", "our-customers": "Our Customers", "about-us": "About us", "terms": "Terms"}'
    ),
    (
        'navbar',
        'sv',
        '{"home": "Hem", "order": "Beställ", "our-customers": "Våra kunder", "about-us": "Om oss", "terms": "Terminer"}'
    );
-- insert multilingual content for terms page
INSERT INTO content (page, language, text)
VALUES (
        'terms',
        'en',
        '{"title": "Terms","buttonText":"Close and Go Back","text1":"BY","text2":" clicking Invoice Now, you choose to register according to the information that you have typed in and the text on the registration page and the terms here, and you at the same time accept the terms here.\n\nYou can use the program FOR FREE for 14 days.\n\n123 Fakturera is so easy and self-explanatory that the chance that you will need support is minimal, but if you should need support, we are here for you, with our office manned for the most part of the day. After the trial period, the subscription continues and costs SEK 99 excluding VAT per month, which is billed annually. If you do not want to keep the program, just cancel the trial period by giving notice before 14 days from registration.\n\nYou have of course the right to terminate the use of the program without any costs, by giving us notice per email before 14 days from registration, that you do not want to continue with the program, and you then of course do not pay anything.\nIf we do not receive such a notice from you before 14 days from registration, then the order, for natural reasons, cannot be changed. With registration it is meant the date and time when you did choose to press the button Invoice Now.\n\n Billing is for one year at a time.\nThe price for 123 Fakturera (offer price SEK 99 per month / ordinary price SEK 159 per month) is for the annual fee Start for one year''s use of the program.\n(When using the offer price of SEK 99, the one-year period is calculated from registration.)\nAll prices are excluding. VAT.\nOffer, Inventory Control, Member Invoicing, Multiuser version and English printout are (or can be) additional modules that can be ordered later.\nIntermediation, as well as invoicing, may take place from K-Soft Sverige AB, Box 2826, 187 28 Täby. In the future, we may choose to cooperate with another company for e.g. intermediation and invoicing. However, the customer relationship is with us. The payment is made to the company from which the invoice comes.\nThe annual fee is on a continuous basis, but if you do not wish to continue using the program, all you have to do is give notice thirty days before the start of the next one-year period.\nThe introductory offer ( SEK 99 per month) is for the annual fee Start for the first year. After the first year, the ordinary price is billed, which is currently, for annual fee Start, one hundred and fifty-nine kroner per month, for annual fee Remote control, three hundred kroner per month and for annual fee Pro, three hundred and thirty-three kroner per month. After one year, the annual Remote Control fee is invoiced as standard, but you can choose Start or Pro by giving notice at any time before the due date.\nIf you choose to keep the program by not notifying us by email within 14 days of registration that you do not wish to continue with the program, you accept that you will pay the invoice for your order. Failure to pay the invoice or late payment does not give the right to cancel the order. We are happy to help you with logo at a cost price.\nLicense for the use of 123 Fakturera is of course sold in accordance with applicable laws.\nIn order to be able to help you more easily and provide you with support, as well as to comply with the laws, we, for natural reasons, have to store your information.\nIn connection with the storage of information, the law requires that we provide you with the following information:\nIf you order as a private person, you have the right to cancel as stated by law. Your information is stored so that we can help you, etc. We will use it to be able to help you if you need help, follow the laws regarding bookkeeping, etc. When there are upgrades and the like, we may send you offers and the like about our products and services by email or the like. You may be contacted by email, post and telephone. If you don''t want to be contacted, just send us an email about it.\nYou can at any time ask not to be sent information about upgrades by email, letter or the like, and we will of course not do that. You send such a request to us by email, post or similar.\nFor natural reasons, we have to store, process and move your data. Your information is stored until further notice. You give us permission to store, process and move your data, as well as to send you offers and the like by email, letter and the like, and tell others that you are customer. Due to the way it works with software, permission also needs to be given to other parties. The permission is therefore granted to us, as well as to the companies and/or person(s) who own the software, the source code, the website and the like. It is also given to current and future companies owned and/or controlled by one or more of those who currently own and/or control us. It is also given to current and future companies owned and/or controlled by one or more of those who currently own and/or control the companies (if any), which own or will own the software, source code, website and the like. It is also given to current and future persons (if any) who own or will own the software, source code, website and the like. This applies both to current and future products and services. It is also given to another company, (like K-Soft Sverige AB), which we can use to send/sell products, upgrades and the like, either by intermediation or otherwise.\nYou of course have the right to request access to, change and deletion of the information we hold about you. You also have the right to request restriction of data processing, and to object to data processing and the right to data portability. You have the right to complain to the supervisory authority. You can find more legal information about us ","text3":"here","text4":". The laws of Ireland are the applicable laws. Placing an order is of course completely voluntary. Of course, we do not use any automated profiling or decisions.\nIf you wish to contact us, please use the information on this website.\nClick on Invoice Now to register according to the information you have entered and the terms here. (Date and time of admission are entered automatically in our registers.)\nOur experience is that our customers are very satisfied with the way we work and hope and believe that this will also be your experience.\nHave a great day!"}'
    ),
    (
        'terms',
        'sv',
        '{"title": "Villkor","buttonText":"Stäng och gå tillbaka","text1":"GENOM ATT klicka på Fakturera Nu så väljer ni att registrera enligt den information som ni har lagt in och texten på registrerings sidan och villkoren här, och accepterar samtidigt villkoren här.","text2":"Ni kan använda programmet GRATIS i 14 dagar.\n\n123 Fakturera är så lätt och självförklarande att chansen för att du kommer behöva support är minimal, men om du skulle behöva support, så är vi här för dig, med vårt kontor bemannat större delen av dygnet. Efter provperioden så fortsätter abonnemanget och kostar 99 kronor exkl. moms per månad, som faktureras årligen. Om du inte vill behålla programmet, så är det bara att avbryta provperioden genom att ge oss besked inom 14 dagar från registrering.\n\nNi har självklart rätt att avsluta användningen av programmet utan kostnad, genom att ge oss besked per email inom 14 dagar från registrering, att ni inte vill fortsätta med programmet, och betalar då självklart inte heller något. \nOm vi inte inom 14 dagar från registrering mottar sådant besked från er, så kan ordern av naturliga orsaker inte ändras. Med registrering menas det datum och klockslag då ni valde att trycka på knappen Fakturera Nu.\n\nFakturering sker för ett år i taget.\nPriset för 123 Fakturera (specialpris kr 99:- / ord. pris kr 159:- per månad) är för årsavgift Start för ett års användning av programmet.\n(Vid användning av specialpriset kr 99:- så räknas ett års perioden från registrering.)\n\nAlla priser är exkl. moms.\nOffert, Lagerstyrning, Medlemsfakturering, Fleranvändarversion och Engelsk utskrift är (eller kan vara) tilläggsmoduler som kan beställas senare.\n\nFörmedling, samt fakturering kan komma att ske från K-Soft Sverige AB, Box 2826, 187 28 Täby. Vi kan i framtiden välja att samarbeta med annat företag för t.ex. förmedling och fakturering. Kundförhållandet är dock självklart med oss. Betalningen görs till det företag som fakturan kommer från.\n\nÅrsavgiften är löpande men om ni inte vill fortsätta att använda programmet, så är det bara att ge besked trettio dagar innan ingången av nästföljande ett års period.\nIntroduktionspriset (kr 99:- per månad) är för årsavgift Start för det första året. Efter det första året faktureras ord. pris vilket för närvarande är, för årsavgift Start, ett hundra och femtinio kronor per månad, för årsavgift Fjärrstyrning, tre hundra kronor per månad och för årsavgift Pro, tre hundra och trettiotre kronor per månad. Efter ett år faktureras årsavgift Fjärrstyrning som standard men ni kan välja Start eller Pro genom att ge besked när som helst innan förfallodagen.\n\nOm ni väljer att behålla programmet genom att inte ge oss besked per email innan 14 dagar från registrering, om att ni inte vill fortsätta med programmet, så accepterar ni att ni kommer att betala fakturan för er beställning. Att inte betala fakturan eller sen betalning ger inte rätt till att annullera beställningen. Vi hjälper gärna att fiksa logo för er till självkostpris.\n\nLicens för användning av 123 Fakturera säljs självklart enligt gällande lagar.\nLicens för användning av 123 Fakturera säljs självklart enligt gällande lagar.\n\nFör att lättare kunna hjälpa er och ge er support samt för att följa lagarna, måste vi av naturliga orsaker spara er information.\nI samband med lagring av information så kräver lagen att vi ger er följande information:\n\nOm ni beställer som privatperson så har ni den ångerrätt som lagen fastställer. Er information sparas så att vi kan hjälpa er m.m. Vi kommer använda den för att kunna hjälpa er om ni behöver hjälp, följa lagarna ang. bokföring m.m. När det kommer uppgraderingar och liknande, kan vi komma att skicka er erbjudande och liknande om våra produkter och tjänster per email eller liknande. Ni kan också komma att bli kontaktad per email, post och telefon.\nOm ni inte vill bli kontaktad, bara skicka oss en email ang. det.\n\nNi kan när som helst begära att inte få tillsänt information om uppgraderingar per email, brev eller liknande och vi kommer då självklart inte att göra det. Sådan begäran skickar ni till oss per email, brev eller liknande.\n\nAv naturliga orsaker måste vi spara, databehandla och flytta era data. Er information sparas tills vidare. Ni ger oss medgivande till att lagra, databehandla och flytta era data, samt att skicka er erbjudanden och liknande per email, brev och liknande, samt att informera andra om att ni är kund. Pga. sättet det fungerar på med programvara behöver medgivandet också ges till andra parter. Medgivandet ges därför till oss, samt till de företag och/eller person/personer som äger programvaran, källkod, hemsidan och liknande. Det ges också till nuvarande och framtida företag ägda och/eller kontrollerade av en eller flera av de som i dag äger och/eller kontrollerar oss. Det ges också till nuvarande och framtida företag ägda och/eller kontrollerade av en eller flera av de som i dag äger och/eller kontrollerar de företag (om några) som äger eller kommer att äga programvaran, källkod, hemsidan och liknande. Det ges också till nuvarande och framtida personer (om några) som äger eller kommer att äga programvaran, källkod, hemsidan och liknande. Detta både för nuvarande och framtida produkter och tjänster. Det ges också till ett annat företag, (som K-Soft Sverige AB), som vi kan använda för att skicka/sälja produkter, uppgraderingar och liknande, antingen genom att under förmedla programvaran eller på annat sätt.\n\nNi har självklart rätt att begära tillgång till, rättelse eller radering av informationen vi har om er. Ni har också rätt att begära begränsning av behandlingen av era uppgifter, eller att invända mot behandling samt rätten till dataportabilitet. Ni har självklart rätt att klaga till tillsynsmyndighet. Mer juridisk info om oss hittar ni","text3":"här","text4":". Det är lagarna i Irland som är gällande lagar. Det är självklart helt frivilligt att lägga er order. Vi använder självklart inte någon automatiserad profilering och inte heller något automatiserat beslutsfattande.\n\nOm ni vill kontakta oss, vänligen använd då informationen på denna hemsidan.\n\nKlicka på Fakturera Nu för att registrera i enlighet med den information som ni har lagt in och villkoren här. (Datum och tidpunkt för inläggningen läggs in automatiskt i våra register.)\n\nVår erfarenhet är att våra kunder är mycket nöjda med sättet vi arbetar på och vi hoppas och tror att det också kommer att bli er upplevelse.\n\nHa en trevlig dag!"}'
    );
-- 40 inserts for product table
INSERT INTO products (
        article_no,
        "product/service",
        in_price,
        price,
        unit,
        in_stock,
        description
    )
VALUES (
        100001,
        'Heavy Truck Rental',
        50000,
        120000,
        'kilometer/hour',
        10,
        '40-ton heavy truck for construction transport'
    ),
    (
        100002,
        'Delivery Van Service',
        15000,
        35000,
        'kilometer/hour',
        25,
        'Medium delivery van for local distribution'
    ),
    (
        100003,
        'Refrigerated Transport',
        45000,
        95000,
        'kilometer/hour',
        8,
        'Temperature-controlled transport for perishables'
    ),
    (
        100004,
        'Crane Truck Service',
        80000,
        180000,
        'kilometer/hour',
        5,
        'Mobile crane with transport capability'
    ),
    (
        100005,
        'Tanker Truck',
        60000,
        140000,
        'kilometer/hour',
        6,
        'Liquid transport truck for fuels and chemicals'
    ),
    (
        100006,
        'Car Carrier Service',
        55000,
        125000,
        'kilometer/hour',
        12,
        'Multi-car transport vehicle'
    ),
    (
        100007,
        'Dump Truck Rental',
        35000,
        80000,
        'kilometer/hour',
        15,
        'Construction dump truck for bulk materials'
    ),
    (
        100008,
        'Flatbed Truck',
        40000,
        90000,
        'kilometer/hour',
        18,
        'Flatbed truck for oversized cargo'
    ),
    (
        100009,
        'Logistics Consulting',
        0,
        25000,
        'kilometer/hour',
        0,
        'Transport route optimization services'
    ),
    (
        100010,
        'Emergency Transport',
        70000,
        160000,
        'kilometer/hour',
        3,
        '24/7 emergency transport services'
    ),
    (
        200001,
        'City Bus Service',
        20000,
        45000,
        'kilometer/hour',
        30,
        'Urban public transportation bus'
    ),
    (
        200002,
        'Tour Bus Rental',
        25000,
        55000,
        'kilometer/hour',
        20,
        'Luxury tour bus for group travel'
    ),
    (
        200003,
        'School Bus Service',
        18000,
        40000,
        'kilometer/hour',
        35,
        'Student transportation services'
    ),
    (
        200004,
        'Airport Shuttle',
        22000,
        48000,
        'kilometer/hour',
        25,
        'Airport transfer shuttle service'
    ),
    (
        200005,
        'Charter Bus',
        30000,
        65000,
        'kilometer/hour',
        15,
        'Private charter bus services'
    ),
    (
        300001,
        'Taxi Service',
        5000,
        12000,
        'kilometer/hour',
        50,
        'Standard taxi transportation'
    ),
    (
        300002,
        'Premium Taxi',
        8000,
        18000,
        'kilometer/hour',
        20,
        'Luxury taxi with premium amenities'
    ),
    (
        300003,
        'Airport Taxi',
        6000,
        15000,
        'kilometer/hour',
        30,
        'Dedicated airport taxi service'
    ),
    (
        400001,
        'Passenger Van',
        12000,
        28000,
        'kilometer/hour',
        40,
        '8-seater passenger van rental'
    ),
    (
        400002,
        'Cargo Van',
        10000,
        22000,
        'kilometer/hour',
        35,
        'Light cargo van for small deliveries'
    ),
    (
        500001,
        'Ambulance Service',
        45000,
        100000,
        'kilometer/hour',
        8,
        'Emergency medical transport'
    ),
    (
        500002,
        'Fire Truck Service',
        0,
        150000,
        'kilometer/hour',
        0,
        'Emergency fire response services'
    ),
    (
        500003,
        'Police Vehicle',
        0,
        80000,
        'kilometer/hour',
        0,
        'Law enforcement patrol services'
    ),
    (
        500004,
        'Tow Truck Service',
        25000,
        60000,
        'kilometer/hour',
        12,
        'Vehicle recovery and towing'
    ),
    (
        500005,
        'Snow Plow Service',
        35000,
        85000,
        'kilometer/hour',
        10,
        'Winter road clearing services'
    ),
    (
        600001,
        'Concrete Mixer',
        30000,
        70000,
        'kilometer/hour',
        15,
        'Mobile concrete mixing and transport'
    ),
    (
        600002,
        'Excavator Transport',
        40000,
        95000,
        'kilometer/hour',
        8,
        'Heavy equipment transport service'
    ),
    (
        600003,
        'Road Sweeper',
        28000,
        65000,
        'kilometer/hour',
        12,
        'Street cleaning and maintenance'
    ),
    (
        700001,
        'Tractor Service',
        15000,
        35000,
        'kilometer/hour',
        25,
        'Agricultural tractor services'
    ),
    (
        700002,
        'Harvester Transport',
        50000,
        110000,
        'kilometer/hour',
        6,
        'Combine harvester transport'
    ),
    (
        800001,
        'Express Delivery',
        8000,
        20000,
        'kilometer/hour',
        45,
        'Priority express delivery service'
    ),
    (
        800002,
        'Freight Forwarding',
        0,
        30000,
        'kilometer/hour',
        0,
        'International freight management'
    ),
    (
        800003,
        'Warehouse Transport',
        12000,
        28000,
        'kilometer/hour',
        30,
        'Inter-warehouse transport services'
    ),
    (
        900001,
        'Moving Truck',
        18000,
        40000,
        'kilometer/hour',
        22,
        'Household and office moving services'
    ),
    (
        900002,
        'Furniture Transport',
        15000,
        35000,
        'kilometer/hour',
        28,
        'Specialized furniture transportation'
    ),
    (
        910001,
        'Car Rental',
        6000,
        15000,
        'kilometer/hour',
        60,
        'Daily car rental service'
    ),
    (
        910002,
        'SUV Rental',
        9000,
        22000,
        'kilometer/hour',
        35,
        'SUV vehicle rental'
    ),
    (
        910003,
        'Luxury Car Rental',
        20000,
        50000,
        'kilometer/hour',
        10,
        'Premium luxury vehicle rental'
    ),
    (
        920001,
        'Mobile Workshop',
        25000,
        60000,
        'kilometer/hour',
        8,
        'On-site vehicle repair service'
    ),
    (
        920002,
        'Inspection Service',
        0,
        18000,
        'kilometer/hour',
        0,
        'Mobile vehicle inspection service'
    );