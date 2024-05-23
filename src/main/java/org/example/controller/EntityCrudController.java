package org.example.controller;

import org.example.entity.EntityWithId;
import org.springframework.data.repository.CrudRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

public class EntityCrudController<T extends EntityWithId> {
    private CrudRepository<T, String> repository;
    private String crudApi;

    public EntityCrudController(CrudRepository<T, String> repository, String crudApi) {
        super();
        this.repository = repository;
        this.crudApi = crudApi;
    }

    Iterable<T> getAll() {
        Iterable<T> findAll = repository.findAll();
        List<T> list = new ArrayList<T>();
        findAll.forEach(list::add);

        return findAll;
    }

    ResponseEntity<T> getById(String id) {
        Optional<T> record = repository.findById(id);
        return record.map(response -> ResponseEntity.ok().body(response))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    ResponseEntity<T> create(T record) throws URISyntaxException {
        T result = repository.save(record);
        return ResponseEntity.created(new URI(crudApi + "/" + result.getId()))
                .body(result);
    }

    ResponseEntity<T> update(T record) {

        T result = repository.save(record);
        return ResponseEntity.ok().body(result);
    }

    public ResponseEntity<T> delete(String id) {
        repository.deleteById(id);
        return ResponseEntity.ok().build();
    }

}
