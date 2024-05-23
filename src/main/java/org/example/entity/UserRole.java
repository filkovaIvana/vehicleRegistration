package org.example.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name="userroles")
public class UserRole {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    @Column(name="key_userrole")
    private long id;

    @Column(name = "name", length = 45)
    private String name;

    @Column(name = "description", length = 245)
    private String description;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "role_has_rights",
            joinColumns = { @JoinColumn(name = "fk_userrole") },
            inverseJoinColumns = { @JoinColumn(name = "fk_userright") }
    )
    List<UserRight> rights = new ArrayList<>();

    @ManyToMany(mappedBy = "roles")
    private List<User> users;

    public UserRole() {
    }

    public UserRole(String name) {
        this.name = name;
    }

    // setter & getter

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
    public List<UserRight> getRights() {
        return rights;
    }

    public void setRights(List<UserRight> rights) {
        this.rights = rights;
    }

    @JsonIgnore
    public List<User> getUsers() {
        return users;
    }

    public void setUsers(List<User> users) {
        this.users = users;
    }

    public void addRight(UserRight ur1) {
        this.rights.add(ur1);
    }
}
