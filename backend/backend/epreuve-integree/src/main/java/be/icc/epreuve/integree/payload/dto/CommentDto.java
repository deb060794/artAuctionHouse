package be.icc.epreuve.integree.payload.dto;

import java.util.Date;

public class CommentDto {
        private long id;
        private String content;
        private String writerName;
        private Date dateCreated;

    public CommentDto() {

    }

    public CommentDto(long id, String content, String writerName, Date dateCreated) {
        this.id = id;
        this.content = content;
        this.writerName = writerName;
        this.dateCreated = dateCreated;
    }

    public void setId(long id) {
        this.id = id;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public void setWriterName(String writerName) {
        this.writerName = writerName;
    }

    public void setDateCreated(Date dateCreated) {
        this.dateCreated = dateCreated;
    }

    public long getId() {
        return id;
    }

    public String getContent() {
        return content;
    }

    public String getWriterName() {
        return writerName;
    }

    public Date getDateCreated() {
        return dateCreated;
    }
}
