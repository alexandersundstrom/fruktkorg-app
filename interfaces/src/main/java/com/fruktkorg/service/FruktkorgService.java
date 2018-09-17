package com.fruktkorg.service;

import com.fruktkorg.common.model.Frukt;
import com.fruktkorg.common.model.Fruktkorg;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class FruktkorgService {
    public static List<Fruktkorg> getAll() {
        int fruktkorgId = 1;
        int fruktId = 1;

        Fruktkorg fruktkorg = new Fruktkorg();
        fruktkorg.setId(fruktkorgId++);
        fruktkorg.setName("Hallen");
        fruktkorg.setLastChanged("4 September");

        Frukt banana = new Frukt("Banan", 3, fruktkorg);
        banana.setId(fruktId++);

        Frukt apple = new Frukt("Äpple", 7, fruktkorg);
        apple.setId(fruktId++);

        fruktkorg.setFruktList(Arrays.asList(banana, apple));

        Fruktkorg fruktkorg2 = new Fruktkorg();
        fruktkorg2.setId(fruktkorgId++);
        fruktkorg2.setName("Köket");
        fruktkorg2.setLastChanged("5 September");

        Frukt orange = new Frukt("Apelsin", 5, fruktkorg2);
        orange.setId(fruktId++);

        Frukt lemon = new Frukt("Citron", 2, fruktkorg2);
        lemon.setId(fruktId++);

        fruktkorg2.setFruktList(Arrays.asList(orange, lemon));

        Fruktkorg fruktkorg3 = new Fruktkorg();
        fruktkorg3.setId(fruktkorgId++);
        fruktkorg3.setName("Vardagsrummet");
        fruktkorg3.setLastChanged("6 September");

        Frukt apple2 = new Frukt("Äpple", 12, fruktkorg3);
        apple2.setId(fruktId++);

        fruktkorg3.setFruktList(Arrays.asList(apple2));

        Fruktkorg fruktkorg4 = new Fruktkorg();
        fruktkorg4.setId(fruktkorgId++);
        fruktkorg4.setName("Kafferummet");
        fruktkorg4.setLastChanged("1 September");

        Frukt orange2 = new Frukt("Apelsin", 5, fruktkorg4);
        orange2.setId(fruktId++);

        Frukt lemon2 = new Frukt("Citron", 2, fruktkorg4);
        lemon2.setId(fruktId++);

        Frukt watermelon = new Frukt("Vattenmelon", 1, fruktkorg4);
        watermelon.setId(fruktId++);

        fruktkorg4.setFruktList(Arrays.asList(orange2, lemon2, watermelon));

        Fruktkorg fruktkorg5 = new Fruktkorg();
        fruktkorg5.setId(fruktkorgId++);
        fruktkorg5.setName("Kafferummet");
        fruktkorg5.setLastChanged("1 September");

        Frukt apple3 = new Frukt("Äpple", 1, fruktkorg5);
        apple3.setId(fruktId++);

        Frukt pear = new Frukt("Päron", 5, fruktkorg5);
        pear.setId(fruktId++);

        fruktkorg5.setFruktList(Arrays.asList(apple3, pear));

        return Arrays.asList(fruktkorg, fruktkorg2, fruktkorg3, fruktkorg4, fruktkorg5);
    }

    public Optional<Fruktkorg> findById(long id) {
        return getAll().stream()
                .filter(fruktkorg -> fruktkorg.getId() == id)
                .findFirst();
    }

    public List<Fruktkorg> findByFrukt(String fruktType) {
        List<Fruktkorg> fruktkorgar = getAll().stream()
                .filter(fruktkorg -> fruktkorg.getFruktList().stream().anyMatch(frukt -> frukt.getType().toLowerCase().contains(fruktType.toLowerCase())))
                .collect(Collectors.toList());
        return fruktkorgar;
    }

}
