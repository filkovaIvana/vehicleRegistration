package org.example.entity;

import lombok.Data;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Data
@Entity
@Table(name="users")
public class User implements EntityWithId {

    @Id
//    @GeneratedValue(strategy=GenerationType.AUTO)
//    private Long id;
    private String id;
    private String userName;
    private String firstName;
    private String middleNames;
    private String lastName;
    private String email;
    private String phoneNumber;
    private boolean active;
    private String password;

    @OneToMany(mappedBy="user")
    private List<Vehicle> vehicles = new ArrayList<>();

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "user_has_roles",
            joinColumns = { @JoinColumn(name = "fk_user") },
            inverseJoinColumns = { @JoinColumn(name = "fk_userrole") }
    )
    private Set<UserRole> roles = new HashSet<>();

    /* getters and setters */
    public List<Vehicle> getVehicles() {
        return new ArrayList<>(vehicles);
    }

    public void addVehicle(Vehicle vehicle) {
        this.vehicles.add(vehicle);
    }

    public void setVehicles(List<Vehicle> vehicles) {
        this.vehicles = new ArrayList<>(vehicles);
    }

    public List<UserRole> getRoles() {
        return new ArrayList<>(roles);
    }

    public void addRole(UserRole userRole) {
        this.roles.add(userRole);
    }

    public void setRoles(List<UserRole> roles) {
        this.roles = new HashSet<>(roles);
    }

}
