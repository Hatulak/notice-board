package com.noticeboard.repositories;

import com.noticeboard.model.Notice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;

@Repository
public interface NoticeRepository extends JpaRepository<Notice, Long> {
    @Transactional
    void deleteAllByOwner_Id(Long id);
}
