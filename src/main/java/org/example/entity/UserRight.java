package org.example.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name="userrights")
public class UserRight {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    @Column(name="key_userright")
    private long id;

    @Column(name = "name", length = 45)
    private String name;

    @Column(name = "description", length = 245)
    private String description;

    @ManyToMany(mappedBy = "rights", fetch = FetchType.EAGER)
    private List<UserRole> roles = new ArrayList<>();

    public UserRight() {
    }

    public UserRight(String name) {
        this.setName(name);
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @JsonIgnore
    public List<UserRole> getRoles() {
        return roles;
    }

    public void setRoles(List<UserRole> roles) {
        this.roles = roles;
    }
}
