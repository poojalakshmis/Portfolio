package com.portfolio.contact.service;

import com.portfolio.contact.model.ContactRequest;
import java.time.Instant;
import java.util.Map;
import java.util.UUID;
import java.util.concurrent.ConcurrentLinkedQueue;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

/**
 * Boilerplate inbox: logs and stores messages in memory. Swap this for email, CRM, or a database
 * integration when you are ready for production.
 */
@Service
public class ContactInboxService {

  private static final Logger log = LoggerFactory.getLogger(ContactInboxService.class);
  private final ConcurrentLinkedQueue<String> recent = new ConcurrentLinkedQueue<>();

  public Map<String, Object> accept(ContactRequest request) {
    String id = UUID.randomUUID().toString();
    String summary =
        "[%s] from=%s (%s) bytes=%d"
            .formatted(
                id,
                request.name(),
                request.email(),
                request.message() == null ? 0 : request.message().length());
    log.info("Contact submission {}", summary);
    recent.add(summary);
    while (recent.size() > 50) {
      recent.poll();
    }
    return Map.of(
        "id", id,
        "receivedAt", Instant.now().toString(),
        "status", "accepted");
  }
}
