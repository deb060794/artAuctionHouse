package be.icc.epreuve.integree.util;

import be.icc.epreuve.integree.models.ArtCategory;
import be.icc.epreuve.integree.services.ArtCategoryService;
import com.fasterxml.jackson.core.JacksonException;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import org.springframework.beans.factory.annotation.Autowired;

import java.io.IOException;
import java.util.Optional;

public class ArtDeserializer extends JsonDeserializer<ArtCategory> {
    @Autowired
    private ArtCategoryService artCategoryService;
    @Override
    public ArtCategory deserialize(JsonParser jsonParser, DeserializationContext deserializationContext) throws IOException, JacksonException {
        String category = jsonParser.getValueAsString().replace("_",  " ");;
        Optional<ArtCategory> artCategory = artCategoryService.findByCategory(category);
        return artCategory.orElseThrow(() -> new RuntimeException("Invalid category: " + category));
    }
}
