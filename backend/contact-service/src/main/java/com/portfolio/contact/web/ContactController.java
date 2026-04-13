package com.portfolio.contact.web;

import com.portfolio.contact.model.ContactRequest;
import com.portfolio.contact.service.ContactInboxService;
import jakarta.validation.Valid;
import java.util.Map;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class ContactController {

  private final ContactInboxService contactInboxService;

  public ContactController(ContactInboxService contactInboxService) {
    this.contactInboxService = contactInboxService;
  }

  @PostMapping("/contact")
  @ResponseStatus(HttpStatus.ACCEPTED)
  public Map<String, Object> submit(@Valid @RequestBody ContactRequest request) {
    return contactInboxService.accept(request);
  }
}
