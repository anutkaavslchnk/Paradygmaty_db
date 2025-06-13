# 



% src/prolog/todo.pl

% mapowanie słów kluczowych na kategorie
% Zakupy spożywcze
keyword(zakupy_spozywcze, ['kup', 'zakupy', 'sklep', 'market', 'biedronka', 'lidl', 'carrefour', 'produkty']).

% Zmywanie naczyń
keyword(zmywanie_naczyn, ['naczynia', 'umyj naczynia', 'zmywarka', 'pozmywaj', 'zmywanie']).

% Czyszczenie podłóg
keyword(czyszczenie_podlog, ['odkurz', 'odkurzanie', 'zamiec', 'mopuj', 'mopowanie', 'zamiatanie']).

% Porządki ogólne
keyword(porzadki, ['sprzataj', 'posprzataj', 'porzadki', 'czysc', 'czyszczenie', 'sprzatanie', 'scieranie']).

% Pranie i ubrania
keyword(pranie, ['pranie', 'wypierz', 'ubrania', 'pralka', 'suszenie', 'prasowanie']).

% Praca biurowa
keyword(praca_biurowa, ['praca', 'biuro', 'projekt', 'raport', 'spotkanie', 'mail', 'zadanie']).

% Gotowanie i kuchnia
keyword(gotowanie, ['gotuj', 'obiad', 'kolacja', 'sniadanie', 'przepis', 'pieczenie', 'smazenie']).

% Ćwiczenia fizyczne
keyword(aktywnosc_fizyczna, ['cwicz', 'trening', 'joga', 'bieganie', 'silownia', 'fitness', 'rower']).

% Nauka i edukacja
keyword(nauka, ['nauka', 'uczenie', 'czytaj', 'studia', 'szkola', 'egzamin', 'lekcja', 'kurs']).

% Sprawy zdrowotne
keyword(zdrowie, ['lekarz', 'dentysta', 'apteka', 'badanie', 'szpital', 'rehabilitacja', 'wizyta']).

% Finanse i rachunki
keyword(finanse, ['oplac', 'rachunek', 'faktura', 'bank', 'przelew', 'karta', 'oszczednosci', 'pieniadze']).

% Podróże
keyword(podroze, ['lot', 'wycieczka', 'hotel', 'rezerwacja', 'podroz', 'wakacje', 'urlop']).

% Rozrywka
keyword(rozrywka, ['film', 'koncert', 'gra', 'rozrywka', 'kino', 'serial', 'teatr', 'impreza']).

% Obowiązki rodzinne
keyword(rodzina, ['rodzina', 'dziecko', 'urodziny', 'rodzice', 'babcia', 'dziadek', 'impreza rodzinna']).

% Pielęgnacja ogrodu
keyword(ogrod, ['ogrod', 'kwiaty', 'koszenie', 'sadzic', 'podlej', 'grabić', 'nawozić']).

% Auto i motoryzacja
keyword(motoryzacja, ['samochod', 'benzyna', 'przeglad', 'opony', 'naprawa', 'myjnia', 'ubezpieczenie']).

% Urzędy i sprawy administracyjne
keyword(administracja, ['poczta', 'urzad', 'paszport', 'dowod', 'podatki', 'rejestracja', 'formularz']).

% Zakupy online
keyword(zakupy_online, ['allegro', 'dostawa', 'kurier', 'zamowienie', 'paczka', 'sklep internetowy']).

% Zwierzęta domowe
keyword(zwierzeta, ['pies', 'kot', 'karmienie', 'weterynarz', 'spacer z psem', 'zwierzak', 'klatka']).


% znajdź kategorię na podstawie słów kluczowych
find_category(Text, Category) :-
    downcase_atom(Text, LowerText),
    keyword(Category, Keywords),
    member(Word, Keywords),
    sub_atom(LowerText, _, _, _, Word),
    !.

% sprawdza, czy zadanie jest podobne do istniejących
check_todo(New, ExistingList) :-
    find_category(New, NewCategory),
    member(Existing, ExistingList),
    find_category(Existing, ExistingCategory),
    NewCategory == ExistingCategory,
    write('error'), !.
check_todo(_, _) :-
    write('ok').
get_category(Text, Category) :-
    (find_category(Text, Category) -> true ; Category = 'Uncategorized').