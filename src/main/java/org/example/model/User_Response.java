package org.example.model;

//import org.example.entity.AreaOfExpertise;

import org.example.entity.User;

import java.util.ArrayList;
import java.util.List;
//import java.util.Set;
//import java.util.stream.Collectors;


public class User_Response extends UserBasics {


    private List<String> registrations;
//    private List<AreaOfExpertise> areas;
//    private Set<String> interests;
//    private Set<String> projects;
//    private Set<String> currentStudentProjects;
//    private Set<String> pastStudentProjects;
//    private List<ProjectAndGrantModel> projectsAndGrants;
    private List<String> relatedWebsites;

    public User_Response() {
        super();
    }

    public User_Response(User user) {
        super(user);
        this.registrations = new ArrayList<>();
        this.registrations.add("Registration 1");
        this.registrations.add("Registration 2");

//        this.areas = new ArrayList<>(user.getAreasOfExpertises());
//        this.interests = new HashSet<String>(user.getInterests());
//        this.projects = new HashSet<String>(user.getProjects());
//        this.projectsAndGrants = user.getProjectsAndGrants().stream().map(ProjectAndGrantModel::new).collect(Collectors.toList());


//        this.currentStudentProjects = user.getCurrentStudentProjects();
//        this.pastStudentProjects = user.getPastStudentProjects();
//        this.relatedWebsites = new ArrayList<String>(user.getRelatedWebsites());
//        this.setImageURl(user.getImageURl());
//        if("Bridgette".equals(this.getFirstName())) {
//            this.setRole("ROLE_ADMIN");
//        }
    }

    public List<String> getRegistrations() {
        return registrations;
    }

    public void setRegistrations(List<String> registrations) {
        this.registrations = registrations;
    }

//    public List<AreaOfExpertise> getAreas() {
//        return areas;
//    }
//
//    public void setAreas(List<AreaOfExpertise> areas) {
//        this.areas = areas;
//    }
//
//    public Set<String> getInterests() {
//        return interests;
//    }
//
//    public void setInterests(Set<String> interests) {
//        this.interests = interests;
//    }
//
//    public Set<String> getProjects() {
//        return projects;
//    }
//
//    public void setProjects(Set<String> projects) {
//        this.projects = projects;
//    }
//
//    public Set<String> getCurrentStudentProjects() {
//        return currentStudentProjects;
//    }
//
//    public void setCurrentStudentProjects(Set<String> currentStudentProjects) {
//        this.currentStudentProjects = currentStudentProjects;
//    }
//
//    public Set<String> getPastStudentProjects() {
//        return pastStudentProjects;
//    }
//
//    public void setPastStudentProjects(Set<String> pastStudentProjects) {
//        this.pastStudentProjects = pastStudentProjects;
//    }
//
//    public List<ProjectAndGrantModel> getProjectsAndGrants() {
//        return projectsAndGrants;
//    }
//
//    public void setProjectsAndGrants(List<ProjectAndGrantModel> projectsAndGrants) {
//        this.projectsAndGrants = projectsAndGrants;
//    }
//
//    public List<String> getRelatedWebsites() {
//        return relatedWebsites;
//    }
//
//    public void setRelatedWebsites(List<String> relatedWebsites) {
//        this.relatedWebsites = relatedWebsites;
//    }
}
