package org.hackathon.cursedlist.controller;

import org.hackathon.cursedlist.model.Record;
import org.hackathon.cursedlist.repository.Mysql;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
@RestController
@CrossOrigin
public class RecordController {

    @Autowired
    Mysql mySql;

    @GetMapping("/get-all-records")
    public List<Record> getRecords() {
        return mySql.findAll();
    }


    @GetMapping("/get-record/{id}")
    public Record getRecord(@PathVariable("id") Integer id) {
        return mySql.findById(id).get();
    }

    @GetMapping("/get-records-by/{pid}")
    public List<Record> getRecordsByPid(@PathVariable("pid") Integer pid) {
        List<Record> recordListOfPid = new ArrayList<>(mySql.findAll().size());
        for (Record record : mySql.findAll()) {
            if (record.getPid() == pid) {
                recordListOfPid.add(record);
            }
        }
        return recordListOfPid;
    }

    @DeleteMapping("delete-record/{id}")
    public boolean deleteRecord(@PathVariable("id") Integer id) {
        if (!mySql.findById(id).equals(Optional.empty())) {
            mySql.deleteById(id);
            return true;
        }
        return false;
    }

    @PutMapping("update/{id}")
    public Record updateRecord(@PathVariable("id") Integer id,
                               @RequestBody Map<String, String> body) {
        Record record = mySql.findById(id).get();
        record.setDate(body.get("date"));
        record.setPid(Integer.parseInt(body.get("pid")));
        record.setPname(body.get("pname"));
        record.setCurse(body.get("curse"));
        record.setTask(body.get("task"));
        record.setCompleted(body.get("completed"));
        mySql.save(record);
        return record;
    }

    @PutMapping("mark-completed/{id}")
    public Record markAsCompletedRecord(@PathVariable("id") Integer id,
                               @RequestBody Map<String, String> body) {
        Record record = mySql.findById(id).get();
        record.setCompleted(body.get("completed"));
        mySql.save(record);
        return record;
    }


    @PostMapping("add-record")
    public Record addRecord(@RequestBody Map<String, String> body) {
        String date = body.get("date");
        Integer pid = Integer.parseInt(body.get("pid"));
        String pname = body.get("pname");
        String curse = body.get("curse");
        String task = body.get("task");
        String completed = body.get("completed");
        Record record = new Record(pid, pname, curse, task, date, completed);
        mySql.save(record);
        return record;
    }

}
