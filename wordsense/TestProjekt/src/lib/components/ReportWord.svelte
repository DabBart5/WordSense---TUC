<script lang="ts">
    import { enhance } from "$app/forms";
    import { onMount } from "svelte";
    import { on } from "svelte/events";
    import type { PageProps } from "../../routes/$types";

  const maxDetailLength = 200;
  let open = $state(false);

    let options = $state([
    "Value1",
    "Value2",
    "Value3",
    "Value4",
    "Value5"
  ]);

    let { wordSet, mode } = $props<{
    mode: string;
    wordSet: any;

  }>();

    $effect(() => {
      description = '';
      selectedReason = '';
      
      if (mode === "definition"){
      options[0] = wordSet[0].definition
      options[1] = wordSet[0].word
      options[2] = wordSet[1].word
      options[3] = wordSet[2].word
      options[4] = wordSet[3].word
      } 
      else {
      options[0] = wordSet[0].word
      options[1] = wordSet[0].definition
      options[2] = wordSet[1].definition
      options[3] = wordSet[2].definition
      options[4] = wordSet[3].definition
      }
    });
  

  let selectedReason = $state("");
  let description = $state("");

  function openPopup() {
    console.log("opening")
    open = true;
  }

  function closePopup() {
    open = false;
  }
</script>

<!-- Report Button -->
<button class="report-btn" onclick={openPopup}>
  Report
</button>

<!-- Modal Popup -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
{#if open}
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <div class="overlay" onclick={closePopup}></div>

  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <div class="modal" onclick={(e) => e.stopPropagation()}>
    <h2>Report this item</h2>

    <form method="POST" action="?/report" use:enhance={() => closePopup}>
      <!-- Reasons -->
      <div class="reasons">
        {#each options as r}
          <label class="reason-item">
            <input
              type="radio"
              name="reason"
              value={r}
              bind:group={selectedReason}
              required
            />
            {r}
          </label>
        {/each}
      </div>

      <!-- Description -->
      <textarea
        name="details"
        placeholder="Optional: Describe the issue…"
        bind:value={description}
        maxlength={maxDetailLength}
      ></textarea>
      <p>{description.length}/{maxDetailLength}</p>

      <!-- Buttons -->
      <div class="actions">
        <button type="button" class="cancel" onclick={closePopup}>
          Cancel
        </button>
        <button type="submit" class="submit">
          Submit Report
        </button>
      </div>
    </form>

  </div>
{/if}
<style>
  .report-btn {
    padding: 0.6rem 1rem;
    background: #d9534f;
    color: white;
    border: none;
    border-radius: 6px;
  }

  .overlay {
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.5);
    z-index: 10;
  }

  .modal {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: var(--background-color);
    padding: 1.5rem;
    border-radius: 10px;
    width: 90%;
    max-width: 380px;
    z-index: 11;
  }

  .reasons {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
  }

  textarea {
    width: 100%;
    height: 80px;
    margin-top: 10px;
    padding: 8px;
    border-radius: 6px;
    border: 1px solid var(--color-bg-contrast);
    background-color: var(--background-color);
    resize: vertical;
    color: var(--color-text);
  }

  .actions {
    display: flex;
    justify-content: flex-end;
    gap: 0.6rem;
    margin-top: 1rem;
  }

  .cancel {
    background: #bbb;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 6px;
  }

  .cancel:hover{
    transform:translateY(1px);
    color:white;
  }

  .submit {
    background: #d9534f;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 6px;
  }
  .submit:hover{
    transform: translateY(1px);
  }
  .reason-item{
    color:var(--color-text);
  }

  h2{
    font-weight: 700;
  }
</style>
