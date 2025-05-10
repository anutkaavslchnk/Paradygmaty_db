# 



% src/prolog/todo.pl

% mapowanie słów kluczowych na kategorie
% Zakupy
keyword(zakupy, ['kup', 'zakup', 'sklep', 'market', 'biedronka', 'lidl']).

% Sprzątanie
keyword(sprzatanie, ['posprzataj', 'odkurz', 'sprzatanie', 'umyj', 'umyc', 'czysc', 'mycie', 'sprzatanie']).

% Praca
keyword(praca, ['napisz', 'projekt', 'kod', 'praca', 'raport', 'spotkanie']).

% Gotowanie
keyword(gotowanie, ['gotuj', 'przepis', 'obiad', 'kolacja', 'sniadanie', 'pieczenie', 'smazenie']).

% Sport
keyword(sport, ['cwicz', 'trening', 'bieganie', 'silownia', 'joga', 'rower', 'pilka']).

% Nauka
keyword(nauka, ['uczenie', 'czytaj', 'nauka', 'kurs', 'szkola', 'studia', 'lekcja', 'egzamin']).

% Zdrowie
keyword(zdrowie, ['lekarz', 'dentysta', 'badanie', 'apteka', 'zdrowie', 'szpital', 'rehabilitacja']).

% Finanse
keyword(finanse, ['oplac', 'faktura', 'rachunek', 'bank', 'przelew', 'budzet', 'wydatki', 'oszczednosci']).

% Podróże
keyword(podroze, ['podroz', 'wycieczka', 'lot', 'hotel', 'rezerwacja', 'wakacje', 'bilety']).

% Rozrywka
keyword(rozrywka, ['film', 'serial', 'koncert', 'gra', 'rozrywka', 'kino', 'teatr', 'impreza']).

% Rodzina
keyword(rodzina, ['dziecko', 'rodzina', 'spotkanie', 'urodziny', 'impreza', 'babcia', 'dziadek', 'rodzice']).

% Ogród
keyword(ogrod, ['kwiaty', 'ogrod', 'podlej', 'sadzic', 'koszenie', 'grabić', 'nawozić']).

% Motoryzacja
keyword(motoryzacja, ['samochod', 'auto', 'benzyna', 'przeglad', 'opony', 'naprawa']).

% Technologia
keyword(technologia, ['komputer', 'telefon', 'aplikacja', 'oprogramowanie', 'aktualizacja', 'internet']).

% Zwierzęta
keyword(zwierzeta, ['pies', 'kot', 'weterynarz', 'karmienie', 'spacer', 'zwierzeta', 'akwarium']).

% Hobby
keyword(hobby, ['rysowanie', 'malowanie', 'fotografia', 'muzyka', 'czytanie', 'modelarstwo']).

% Zakupy online
keyword(zakupy_online, ['allegro', 'zamowienie', 'dostawa', 'kurier', 'paczka', 'sklep internetowy']).

% Administracja
keyword(administracja, ['poczta', 'urzad', 'dowod', 'paszport', 'rejestracja', 'podatki']).


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
