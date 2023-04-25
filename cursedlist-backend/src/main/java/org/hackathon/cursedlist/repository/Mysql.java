package org.hackathon.cursedlist.repository;

import org.hackathon.cursedlist.model.Record;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
@Transactional
public interface Mysql extends JpaRepository<Record, Integer> {
}
