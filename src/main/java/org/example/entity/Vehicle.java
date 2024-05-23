package org.example.entity;

import lombok.Data;

import javax.persistence.*;
import java.util.Date;

@Data
@Entity
@Table(name="vehicles")
public class Vehicle {

    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Long id;
    private String registrationCode;
    private Date validUntil;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "fk_user", nullable = false)
    private User user;

    public Vehicle() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getRegistrationCode() {
        return registrationCode;
    }

    public void setRegistrationCode(String registrationCode) {
        this.registrationCode = registrationCode;
    }

    public Date getValidUntil() {
        return validUntil;
    }

    public void setValidUntil(Date validUntil) {
        this.validUntil = validUntil;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

}
