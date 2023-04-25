package org.hackathon.cursedlist.model;

import javax.persistence.*;

@Entity
@Table(name = "tasks")
public class Record {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer id;

    String task;
    String curse;
    String date;
    String pname;
    String completed;
    Integer pid;


    public Record(Integer pid, String pname, String curse, String task, String date, String completed) {
        this.pid = pid;
        this.pname = pname;
        this.curse = curse;
        this.task = task;
        this.date = date;
        this.completed = completed;
    }

    public Record() {
    }

    public String getCompleted() {
        return completed;
    }

    public void setCompleted(String completed) {
        this.completed = completed;
    }

    public Integer getId() {
        return id;
    }

    public String getTask() {
        return task;
    }

    public void setTask(String task) {
        this.task = task;
    }

    public String getCurse() {
        return curse;
    }

    public void setCurse(String curse) {
        this.curse = curse;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getPname() {
        return pname;
    }

    public void setPname(String pname) {
        this.pname = pname;
    }

    public Integer getPid() {
        return pid;
    }

    public void setPid(Integer pid) {
        this.pid = pid;
    }
}
