<template>
  <div class="student-page">
    <section class="student-section-card">
      <header class="student-section-header">
        <h1 class="student-section-title">
          Materials
        </h1>
        <p class="student-section-subtitle">
          Quick access to your class resources, grouped by session.
        </p>
      </header>

      <div v-if="isLoading" class="state-shell" role="status" aria-live="polite">
        <q-spinner size="28px" color="primary" />
        <p class="state-text">Loading materials…</p>
      </div>

      <div v-else-if="errorMessage" class="state-shell" role="alert">
        <q-icon name="error_outline" size="26px" />
        <p class="state-text">{{ errorMessage }}</p>
        <button class="retry-btn" type="button" @click="loadMaterials">
          Retry
        </button>
      </div>

      <div v-else-if="!groupedMaterials.length" class="state-shell">
        <q-icon name="school" size="26px" />
        <p class="state-text">No materials yet. They’ll appear here once teachers upload them.</p>
      </div>

      <div v-else>
        <div
          v-for="group in groupedMaterials"
          :key="group.classId + '-' + group.sessionId"
          class="materials-group"
        >
          <h2 class="materials-group-title">
            {{ group.classTitle }} ·
            <span class="materials-group-session">
              {{ group.sessionLabel }}
            </span>
          </h2>

          <ul class="student-list">
            <li
              v-for="mat in group.items"
              :key="mat.id"
              class="student-list-item"
            >
              <div class="student-list-main">
                <span class="student-list-title">
                  {{ mat.title }}
                </span>
                <span class="student-list-meta">
                  {{ mat.addedLabel }} · {{ mat.type }}<span v-if="mat.size"> · {{ mat.size }}</span>
                </span>
              </div>
              <button
                type="button"
                class="student-list-action"
              >
                View
              </button>
            </li>
          </ul>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { supabase } from 'src/services/supabaseClient'

const isLoading = ref(true)
const errorMessage = ref('')
const materials = ref([])

async function loadMaterials () {
  isLoading.value = true
  errorMessage.value = ''

  try {
    const { data: userRes, error: userErr } = await supabase.auth.getUser()
    if (userErr) throw userErr
    const userId = userRes?.user?.id
    if (!userId) {
      materials.value = []
      isLoading.value = false
      return
    }

    const { data, error } = await supabase
      .from('session_materials')
      .select(`
        id,
        class_id,
        session_id,
        title,
        description,
        storage_path,
        mime_type,
        file_size,
        created_at,
        classes:classes!session_materials_class_id_fkey (
          title
        ),
        session:class_sessions!session_materials_session_id_fkey (
          starts_at,
          title
        )
      `)
      .order('created_at', { ascending: false })

    if (error) throw error

    materials.value = (data ?? []).map(row => {
      const date = row.created_at ? new Date(row.created_at) : null
      const addedLabel = date
        ? date.toLocaleDateString([], { month: 'short', day: 'numeric' })
        : ''
      const ext = row.mime_type?.split('/')[1] || row.storage_path.split('.').pop() || ''
      const sizeKb = row.file_size ? Math.round(row.file_size / 1024) : 0
      const sessionStarts = row.session?.starts_at ? new Date(row.session.starts_at) : null
      const sessionLabel = sessionStarts
        ? `${sessionStarts.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' })}`
        : (row.session?.title || 'Session')

      return {
        id: row.id,
        classId: row.class_id,
        classTitle: row.classes?.title || 'Class',
        sessionId: row.session_id,
        sessionLabel,
        title: row.title,
        type: ext.toUpperCase(),
        size: sizeKb ? `${sizeKb} KB` : '',
        addedLabel
      }
    })
  } catch (err) {
    errorMessage.value = err?.message || 'Could not load materials.'
    materials.value = []
  } finally {
    isLoading.value = false
  }
}

const groupedMaterials = computed(() => {
  const groups = new Map()
  for (const m of materials.value) {
    const key = `${m.classId}:${m.sessionId}`
    if (!groups.has(key)) {
      groups.set(key, {
        classId: m.classId,
        sessionId: m.sessionId,
        classTitle: m.classTitle,
        sessionLabel: m.sessionLabel,
        items: []
      })
    }
    groups.get(key).items.push(m)
  }
  return Array.from(groups.values())
})

onMounted(() => {
  loadMaterials()
})
</script>

<style scoped lang="scss">
.student-page {
  min-height: 100vh;
  padding: 5vw 4vw 20vw;
  background-color: $app-bg;
  color: $dark;
}

.student-section-card {
  background-color: #FFFFFA;
  border-radius: 4vw;
  padding: 4.2vw 4vw;
  box-shadow: 0 1.4vw 4vw rgba(0, 0, 0, 0.06);
}

.student-section-header {
  margin-bottom: 3.4vw;
}

.student-section-title {
  margin: 0 0 1.2vw;
  font-family: $font-title;
  font-size: 6vw;
  letter-spacing: 0.08em;
  color: rgba(33, 26, 30, 0.96);
}

.student-section-subtitle {
  margin: 0;
  font-family: $font-body;
  font-size: 3.4vw;
  color: rgba(33, 26, 30, 0.7);
}

.student-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 2.8vw;
}

.state-shell {
  min-height: 40vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 3vw;
  padding: 8vw 4vw;
  text-align: center;
  color: rgba(33, 26, 30, 0.75);
}

.state-text {
  margin: 0;
  font-family: $font-body;
  font-size: 3.6vw;
}

.retry-btn {
  border: none;
  border-radius: 999vw;
  padding: 2.8vw 5vw;
  min-height: 12vw;
  background-color: $dark;
  color: $app-bg;
  font-family: $font-body;
  font-size: 3.6vw;
}

.materials-group {
  margin-bottom: 4vw;
}

.materials-group-title {
  margin: 0 0 2.4vw;
  font-family: $font-title;
  font-size: 4vw;
  letter-spacing: 0.04em;
  color: rgba(33, 26, 30, 0.96);
}

.materials-group-session {
  font-family: $font-body;
  font-size: 3.4vw;
  color: rgba(33, 26, 30, 0.7);
}

.student-list-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 3vw;
}

.student-list-main {
  display: flex;
  flex-direction: column;
  gap: 1vw;
}

.student-list-title {
  font-family: $font-body;
  font-size: 3.6vw;
  color: $dark;
}

.student-list-meta {
  font-family: $font-body;
  font-size: 3vw;
  color: rgba(33, 26, 30, 0.65);
}

.student-list-action {
  flex: 0 0 auto;
  min-width: 18vw;
  min-height: 10vw;
  padding: 1.8vw 3.4vw;
  border-radius: 999vw;
  border: none;
  background-color: $primary;
  color: #FFFFFA;
  font-family: $font-body;
  font-size: 3.2vw;
  cursor: pointer;
}
</style>

