package be.icc.epreuve.integree.payload.request;

import java.math.BigDecimal;

public class BidRequest {
    private BigDecimal amount;
    private long artId;
    private long bidderId;

    public long getBidderId() {
        return bidderId;
    }

    public void setUserId(long userId) {
        this.bidderId = userId;
    }

    public long getArtId() {
        return artId;
    }

    public void setArtId(long artId) {
        this.artId = artId;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }




}
