TODO:
...
- Uitzoeken hoe ik het openen van een popup kan triggeren wanneer iemand op de container of alles in de container klikt.
- Zorgen dat de waarde vanuit een inputfield wordt opgeslagen in een variabele en vervolgens in de UI wordt getoond.
    - Allen bij een bevestiging meenemen
- Wanneer de gebruiker op 
- Tijdens de countdown en iemand klikt op de text - icoon dan de countdown pauseren.

- pause functie bouwen die de interval stopt. 
- clear minutes functie, als iemand een nieuwe waarde invoert dan houden we dat aan.
- Play functie als iemand een waarde heeft ingevoerd en wil aftellen dan moet je op play klikken. 
- reset is timer weer de waarde geven die het als input heeft gekregen.
- Wanneer de setTimeout nog niet is getriggerd dan tonen we geen play maar soort van invoer actie.

-- Bekijk : https://www.youtube.com/watch?v=S-VeYcOCFZw&ab_channel=WebDevSimplified


--- action bar
<!-- <ul class="nav-actions">
                <li class=" link timer" onclick="openPopUp()"><object data="/src/images/icons/timer.svg"></object><span class="time">00:00:00</span></li>
                <div class="dropdown-menu">
                    Dropdown content
                </div>
                <li class="link"><object data="/src/images/icons/wifi.svg"></object></li>
                <li class="link"><object data="/src/images/icons/battery.svg"></object></li>
                <li class="link"><object data="/src/images/icons/control-center.svg"></object></li>
                <li class="link">Sat 30 Apr 17:00</li>
            </ul> -->


--- popup


bij een klik op het document check of er

- op de dropdown button wordt geklikt
    Want toon dan de popup of niet
    is er sprake van een interval? toon dan content b en anders a
    wanneer er op de popup wordt geklikt doe dan niks maar daarbuiten mag je de popup sluiten

- bekijken of er een event plaatsvind op de 'set' knop
    - doet alleen wat wanneer er een waarde is ingevoerd
    - gebruikt waarde om timer te zetten
    - start ook direct de timer

- bekijken of er een event plaatsvind op de 'pause' knop
    - Pauzeer de timer -> Clear interval
    - onthoud waar we zijn gebleven.
    - verander de pause knop naar play knop

- bekijken of er een event plaatsvind op de play knop
    - start de timer met resterend aantal minuten.


- bekijken of er een event plaastvind op de stop knop
    - stop de interval
    - reset de interval id
    - reset de getoonde timer naar 00:00:00 en de ingevoerde minuten naar 0
    - zorg ervoor dat de 'set' popup ook weer wordt getoond