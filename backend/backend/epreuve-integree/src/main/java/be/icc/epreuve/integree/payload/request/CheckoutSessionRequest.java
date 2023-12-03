package be.icc.epreuve.integree.payload.request;

import java.util.List;

public class CheckoutSessionRequest {
    private List<Long> artIds;

    // Getters and setters
    public List<Long> getArtIds() {
        return artIds;
    }

    public void setArtIds(List<Long> artIds) {
        this.artIds = artIds;
    }
}

