Specyfikacja aplikacji „Raply”

1. Wprowadzenie
1.1 Cel aplikacji
Celem aplikacji Raply jest uproszczenie i automatyzacja procesu tworzenia raportów z kampanii reklamowych prowadzonych na platformach Meta Ads (Facebook/Instagram) i Google Ads. Aplikacja umożliwia szybkie połączenie kont reklamowych, generowanie przejrzystych, profesjonalnych dashboardów oraz dostarczenie klientom zrozumiałych analiz i rekomendacji dzięki wykorzystaniu sztucznej inteligencji.
Raply pozwala:
zaoszczędzić czas poświęcany na tworzenie raportów,
lepiej komunikować wyniki kampanii do klientów,
analizować efektywność działań marketingowych dzięki AI,
przygotować plan dalszych działań w oparciu o dane.

1.2 Grupa docelowa
Aplikacja została zaprojektowana z myślą o:
Freelancerach, którzy potrzebują:
szybkiego i profesjonalnego narzędzia do raportowania dla klientów,
narzędzia wspomagającego analizę wyników kampanii i podejmowanie decyzji.
Małych i średnich agencjach marketingowych, które:
prowadzą wiele kont reklamowych,
chcą skalować raportowanie bez obciążania zespołu,
potrzebują zachować spójność i profesjonalizm (white-label).
Firmach i działach marketingu, które:
samodzielnie prowadzą kampanie reklamowe,
nie mają specjalistycznej wiedzy analitycznej,
potrzebują prostego narzędzia do śledzenia skuteczności działań.

1.3 Wartość biznesowa
Raply odpowiada na konkretne problemy i potrzeby rynkowe:
Oszczędność czasu – redukcja czasu przygotowania raportu z 1 godziny do kilku minut.
Lepsza komunikacja z klientem – AI wyjaśnia dane prostym językiem (tłumaczy metryki na ludzki język).
Decyzje oparte na danych – agent AI dostarcza gotowe rekomendacje, co robić dalej.
Profesjonalizm i spójność – dzięki szablonom i personalizacji (branding) raporty są zawsze na wysokim poziomie.
Wzrost retencji klientów – lepsze zrozumienie wyników = większe zaufanie = dłuższa współpraca.
Skalowalność – możliwość obsługi wielu klientów bez wzrostu kosztów operacyjnych.

1.4 Zakres pierwszej wersji (MVP)
Funkcjonalności dostępne w pierwszym wydaniu aplikacji Raply:
Logowanie i konto użytkownika
Rejestracja i logowanie przez e-mail.
E-mail wykorzystywany do wysyłki gotowych raportów.
Integracja z kontami reklamowymi
Możliwość podpięcia konta Meta Ads i Google Ads.
Pobieranie danych kampanii, reklam, zestawów.
Dashboardy i szablony raportów
Gotowe szablony: np. kampanie leadowe, sprzedażowe, zasięgowe.
Wybór zakresu dat (np. ostatnie 7 dni, miesiąc, niestandardowy).
Widok: ROAS, koszt konwersji, CPM, CTR, wydatki, wyniki.
Agent AI
Generowanie opisu wyników (ludzki język, zrozumiały dla klienta).
Tworzenie rekomendacji i roadmapy działań na podstawie danych.
Eksport i wysyłka
Generowanie raportu PDF.
Możliwość wysłania raportu bezpośrednio na e-mail klienta.
Alternatywnie: link do raportu online (podgląd bez logowania).
Porównanie okresów
Wzrosty/spadki metryk: tydzień do tygodnia, miesiąc do miesiąca.
Wyróżnianie największych zmian.
Personalizacja wizualna
Logo klienta/agencji.
Kolory zgodne z brandbookiem.
Tytuły i opisy edytowalne.
Tryby raportowania
„Szybki raport” – 1 klik, minimum edycji.
„Raport rozbudowany” – możliwość edycji, personalizacji, własny szablon.

2. Opis funkcjonalny
2.1 Proces logowania i kont użytkownika
Użytkownik rejestruje się i loguje za pomocą adresu e-mail i hasła.
E-mail użytkownika pełni funkcję:
identyfikatora konta,
adresu nadawcy raportów wysyłanych do klientów.
Po zalogowaniu użytkownik ma dostęp do swojego panelu głównego z listą raportów i podłączonych kont reklamowych.

2.2 Integracja z kontami reklamowymi (Meta Ads, Google Ads)
Użytkownik może dodać konta reklamowe za pomocą OAuth:
Meta Ads (Facebook/Instagram),
Google Ads.
Aplikacja pobiera dane kampanii, zestawów reklam, reklam i wyników historycznych.
Możliwość zarządzania wieloma kontami z poziomu jednego profilu (np. agencja z wieloma klientami).

2.3 Dashboardy i raporty
Po podłączeniu konta użytkownik może utworzyć nowy raport, wybierając:
konto reklamowe, konkretną kampanię, zestaw reklam lub reklamę,
szablon raportu (np. leady, sprzedaż, zasięg),
zakres dat.
Aplikacja automatycznie generuje dashboard z kluczowymi metrykami:
wydatki, ROAS, CTR, CPM, koszt konwersji, liczba konwersji itd.
Możliwość przeglądu raportu w aplikacji lub eksportu.

2.4 Szablony dashboardów
Wbudowane szablony raportów:
Leady: koszt per lead, liczba kontaktów, CPL, CTR.
Sprzedaż: ROAS, koszt zakupu, liczba konwersji, wartość koszyka.
Zasięg/Branding: zasięg, wyświetlenia, częstotliwość, CPM.
Możliwość stworzenia własnych szablonów (custom) przez użytkownika w wersji PRO.

2.5 Zakres dat, filtracja, porównania okresów
Użytkownik może wybrać zakres dat:
szybkie wybory: ostatnie 7 dni, miesiąc, kwartał,
niestandardowy zakres dat (od–do).
Porównania okresów:
tydzień do tygodnia,
miesiąc do miesiąca,
zakres A vs zakres B.
Wyróżnienie wzrostów/spadków + kolorystyka: 🔴 spadek / 🟢 wzrost.

2.6 Personalizacja wyglądu (white-label)
Możliwość dostosowania wyglądu raportu do brandu agencji lub freelancera:
dodanie logotypu,
wybór kolorystyki,
własny nagłówek i stopka w raporcie PDF,
możliwość podpisania raportu własnym imieniem/nazwą agencji.

2.7 Agent AI
Opis wyników kampanii (tłumaczenie metryk):
AI analizuje dane z kampanii i generuje zrozumiałe podsumowanie, np.: „W ostatnim miesiącu pozyskano 153 leady przy średnim koszcie 24,56 zł. To wzrost o 13% względem poprzedniego miesiąca.”
Wyjaśnienia w stylu: „CTR 1,3% oznacza, że na 100 wyświetleń reklamy, 1,3 osoby kliknęły – to dobry wynik w tej branży.”
Rekomendacje i roadmapa działań:
„Przetestuj nową kreację w najlepiej działającym zestawie.”
„Zwiększ budżet o 20% w kampanii X, która ma ROAS 4.1.”
„Wyklucz grupy wiekowe 18–24 – słaby CTR i wysoki CPL.”
Możliwość eksportu rekomendacji jako lista zadań (checklista).

2.8 Generowanie i eksport raportu
Raport można wygenerować jako plik PDF:
zawiera dashboard z metrykami,
opis AI,
rekomendacje AI,
personalizowane logo i kolory.
Można też wygenerować link do podglądu:
alternatywa dla PDF,
raport online dostępny z linku,
link nie wymaga logowania – można wysłać klientowi jako „wersję online”.
Wysyłka na maila klienta:
Możliwość wpisania jednego lub kilku adresów e-mail klienta.
Raport wysyłany z adresu użytkownika (np. agencji).
Mail zawiera: załącznik PDF lub link do raportu.

2.9 Tryby raportowania: szybki vs rozbudowany
Szybki raport:
wybór konta + zakres dat + klik „Generuj” → gotowy raport w 30 sekund,
idealne na szybki update.
Raport rozbudowany:
możliwość edycji szablonu,
ręczna selekcja metryk,
dodanie komentarzy/uwag do raportu,
personalizacja wyglądu i treści.

2.10 Historia i wersje raportów
Użytkownik ma dostęp do historii wszystkich raportów.
Raporty można:
przeglądać online,
pobierać ponownie jako PDF,
duplikować i aktualizować na nowym zakresie dat.
Możliwość porównania dwóch wersji raportu (np. z sierpnia i września).
3. Funkcjonalności dodatkowe (propozycje rozwojowe)
3.1 Interaktywny kreator raportu (drag & drop metryk)
Umożliwia użytkownikowi budowanie własnego dashboardu z metryk:
przeciąganie bloków (ROAS, CTR, CPM, koszt konwersji itd.),
ustalanie kolejności sekcji (np. najpierw AI opis, potem wykresy),
zapisywanie jako własny szablon do ponownego użycia.
Przydatne dla zaawansowanych użytkowników i agencji z nietypowymi potrzebami.

3.2 Agent AI Pro – analiza trendów i wykrywanie anomalii
Rozszerzona wersja AI:
śledzi trendy (np. „CPL systematycznie rośnie od 3 tygodni”),
identyfikuje anomalie („nagle spadł CTR o 40% w kampanii X”),
podpowiada hipotezy i sugeruje testy A/B.
Możliwość ustawienia alertów mailowych, gdy:
kampania osiąga niski ROAS,
wydatki przekraczają limit,
metryki zmieniają się dramatycznie.

3.3 Checklisty i taski z raportu
Rekomendacje AI mogą być zapisywane jako zadania do wykonania.
Możliwość eksportu do narzędzi zewnętrznych:
ClickUp, Trello, Notion, Asana.
Opcja przypisywania tasków do członków zespołu (dla agencji).

3.4 Harmonogram automatycznych raportów
Ustawienie, że np. w każdy poniedziałek o 10:00 klient X dostaje raport za ostatni tydzień.
Raport generowany automatycznie i wysyłany mailowo.
Idealne dla freelancerów/agencji obsługujących wielu klientów.

3.5 Alerty i powiadomienia o KPI
Użytkownik może ustawić własne progi KPI:
„Jeśli ROAS < 2.0 → wyślij alert”,
„Jeśli liczba konwersji < 100 → ostrzeż”.
Powiadomienia w aplikacji lub e-mail.

3.6 Testy A/B i ich analiza w raportach
Wbudowane wsparcie do raportowania wyników testów A/B:
pokazanie różnic między wariantami reklam (np. w CTR, CPC),
automatyczna analiza, który zestaw wypada lepiej,
rekomendacje AI na bazie wyników testu.

3.7 Zbiorczy raport dla wielu kont reklamowych
Przydatne dla agencji: możliwość wygenerowania raportu:
„całościowego” (np. wszystkie kampanie dla danego klienta z 3 kont),
porównującego wyniki różnych kont w jednej firmie.
Przykład: sklep z DE, PL i UK → raport łączony z podziałem.

3.8 Biblioteka raportów i porównań historycznych
Użytkownik może zapisywać i tagować raporty.
Wyszukiwarka po nazwie klienta, kampanii, dacie.
Porównywarka dwóch raportów w czasie (np. kampania Q1 vs Q2).

3.9 Integracje z innymi platformami
GA4 – dane o zachowaniu użytkownika po kliknięciu reklamy,
TikTok Ads / LinkedIn Ads / Pinterest Ads – rozszerzenie zasięgu,
CRM (np. HubSpot, Pipedrive) – mierzenie pełnego lejka (kliknięcie → lead → sprzedaż),
Notion / Slack – raporty jako wiadomości lub wpisy w narzędziach zespołowych.

3.10 System kont zespołowych i ról
Wersja dla agencji:
konto główne + konta członków zespołu (np. junior, analityk, manager),
różne poziomy dostępu: tylko odczyt / edycja / admin,
możliwość przypisywania raportów do osób w zespole.

3.11 Marketplace z szablonami raportów
Biblioteka gotowych szablonów do pobrania/stworzenia:
dla różnych branż (e-commerce, edukacja, usługi lokalne),
stylizacje graficzne: minimalistyczny, nowoczesny, korporacyjny.
Możliwość tworzenia i sprzedaży własnych szablonów (community).

3.12 Wielojęzyczność raportów
Automatyczne tłumaczenie treści raportu (AI) na: angielski, niemiecki, hiszpański, polski itd.
Przydatne dla agencji z klientami zagranicznymi.

3.13 System CRM do zbierania leadów + statystyki + liczenie konwersji
Cel funkcji: Pozwoli użytkownikom śledzić pełny lejek marketingowy – od kliknięcia reklamy, przez pozyskany lead, aż po sprzedaż i wyliczenie realnej rentowności kampanii — wszystko bez konieczności używania zewnętrznego CRM-a.

4. Struktura aplikacji (główne sekcje)
4.1 Dashboard główny (Home)
Widok powitalny po zalogowaniu.
Najważniejsze informacje „na start”:
lista ostatnich raportów,
skrót wyników z podłączonych kont (np. wydatki, konwersje),
powiadomienia od AI (np. „Koszt leada wzrósł o 15% w kampanii X”).
CTA: „Stwórz nowy raport”.

4.2 Raporty
Lista wszystkich raportów wygenerowanych przez użytkownika.
Filtry: klient, konto reklamowe, data, status.
Funkcje przy każdym raporcie:
podgląd,
edycja,
eksport (PDF, link),
wyślij mailem,
duplikuj.
Historia raportów z możliwością porównania dwóch wersji.

4.3 Nowy raport (Kreator)
Kroki tworzenia raportu:
Wybierz konto reklamowe (Meta Ads / Google Ads),
Wybierz szablon (lead, sprzedaż, zasięg, custom),
Ustaw zakres dat i opcje porównania (np. MoM),
Personalizacja (logo, kolory, komentarze) – chociaż to raczej w ustawieniach konta,
Podgląd raportu z opisem AI i rekomendacjami.
Opcje: „Szybki raport” (1 klik) lub „Raport rozbudowany”.

4.4 Integracje
Sekcja do podłączania i zarządzania kontami reklamowymi:
Meta Ads (Facebook/Instagram),
Google Ads,
w przyszłości: TikTok, LinkedIn, GA4, CRM itd.
Lista podłączonych kont z możliwością odłączenia / aktualizacji.

4.5 Leady (Raply CRM Light – moduł dodatkowy)
Widok tabelaryczny w stylu Excela.
Lista leadów z kampanii:
data, imię, źródło (kampania, reklama),
wartość, status (nowy, sprzedany, utracony),
komentarz.
Możliwość dodania / edycji leadów ręcznie. Statystyki konwersji i przychodów.

4.6 Szablony raportów
Biblioteka gotowych szablonów.
Możliwość tworzenia własnych customowych.
Marketplace (w przyszłości).

4.7 Ustawienia
Konto użytkownika:
dane firmy, e-mail, hasło,
branding (logo, kolory).
Zespół (jeśli plan agencja):
dodawanie członków i ról.
Subskrypcja:
plan, płatności, faktury.

4.8 Personalizacja UI (white-label)
Branding agencji/firmy:
wgranie logotypu,
ustawienie kolorów (primary, secondary),
możliwość dodania własnej stopki (np. podpis agencji w raporcie).

4.9 Powiadomienia i alerty
Pasek powiadomień w aplikacji (ikona dzwonka).
AI podpowiada anomalie (np. „koszt wzrósł o 30% w ciągu 7 dni”).
Alerty KPI ustawiane przez użytkownika.

4.10 Responsywność i mobile
Aplikacja dostępna jako web-app (desktop + mobile).
Na telefonie:
szybki podgląd raportów,
możliwość wysłania linku/PDF do klienta „z telefonu”.

5. Model biznesowy
5.1 Cennik
Freemium (plan darmowy):
dostęp do 1 konta reklamowego (Meta Ads lub Google Ads),
max. 2 raporty miesięcznie,
brak personalizacji graficznej,
raport tylko w PDF (bez AI opisu/rekomendacji).
Cel: pozyskanie jak największej bazy użytkowników i pokazanie wartości aplikacji → zachęta do upgrade’u.

Abonament miesięczny / roczny:
Plan Starter (np. 47 zł/mies.)
do 5 kont reklamowych,
do 10 raportów miesięcznie,
podstawowe szablony,
AI opis wyników (bez rekomendacji PRO).
Plan Pro (np. 87 zł/mies.)
do 10 kont reklamowych,
9 zł za każde dodatkowe konto do abonamentu,
raporty bez limitu,
pełne AI (opis + rekomendacje + roadmapa),
porównania okresów, analiza trendów,
pełna personalizacja (white-label),
alerty.
Plan Agency (np. 177 zł/mies.)
do 20 kont reklamowych,
7 zł za każde dodatkowe konto do abonamentu,
użytkownicy zespołowi,
automatyczne raporty (harmonogram),
white-label (logo agencji, własna domena linków),
wsparcie premium,
alerty.
Zniżki i program partnerski:
Zniżka 20% za płatność roczną,
5% ref link co miesiąc na panel polecającego od każdego klienta,
50% zniżki na pierwszy miesiąc z linka polecającego od partnera.

5.2 Liczba klientów / raportów w planach
Cel 1 rok (MVP + rozwój):
500 aktywnych użytkowników płatnych,
10 000 raportów wygenerowanych w systemie.
Cel 2–3 lata:
2 000–3 000 płatnych subskrybentów,
100 000+ raportów rocznie,
penetracja rynków zagranicznych (UK, DE, US).

Rozwinięcia i dodatkowe funkcjonalności
AI agent rozpoznający anomalie
„W ostatnim tygodniu koszt leadu wzrósł o 27%. Możliwa przyczyna: wyczerpanie grupy odbiorców.”
Propozycja: automatyczne wykrywanie i alerty.
Rekomendacje AI w stylu tasków
„Zduplikuj najlepiej działającą reklamę i przetestuj nową kreację w zestawie X.”
Możliwość eksportu rekomendacji jako checklisty do ClickUp / Notion / Trello.
Asystent do onboardingu
Interaktywny przewodnik po aplikacji + „raport demo” z przykładowymi danymi, by pokazać wartość od razu po rejestracji.
Funkcja porównania kampanii „Top performers”
Możliwość wygenerowania raportu porównującego najlepsze kampanie na różnych kontach lub w różnych miesiącach.
