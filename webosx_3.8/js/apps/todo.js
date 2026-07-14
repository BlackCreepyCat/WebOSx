        // ==================================================================
        // App "Liste de tâches" — plusieurs listes, cases à cocher,
        // persistées dans UN SEUL fichier JSON à la racine du VFS
        // (Tâches.json). Volontairement lisible/éditable aussi depuis le
        // Bloc-notes ou `cat`/`echo` dans le Terminal — pas de format
        // propriétaire caché.
        // ==================================================================

        const TODO_ICON = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M9 6h11"/><path d="M9 12h11"/><path d="M9 18h11"/><path d="m3 6 1.5 1.5L7 5"/><path d="m3 12 1.5 1.5L7 11"/><path d="m3 18 1.5 1.5L7 17"/></svg>`;
        const TODO_FILE_PATH = ['Tâches.json'];

        function genTodoId(prefix) { return prefix + '-' + Date.now().toString(36) + Math.random().toString(36).slice(2, 8); }

        // ---- Utilitaires de date ----
        // Format de stockage : "YYYY-MM-DD" (format natif de <input type="date">).
        // La comparaison lexicographique de deux chaînes ISO donne directement
        // l'ordre chronologique, pas besoin de parser en Date pour comparer.
        function todoTodayISO() {
            const d = new Date();
            return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
        }
        function todoDateStatus(dueDate, todayStr) {
            if (!dueDate) return null;
            if (dueDate < todayStr) return 'overdue';
            if (dueDate === todayStr) return 'today';
            return 'upcoming';
        }
        function todoRelativeDateLabel(dueDate) {
            const today = todoTodayISO();
            if (dueDate === today) return I18N.t('todo.dateToday');
            // Les deux dates sont parsées de la même façon (UTC minuit, forme ISO
            // "date seule") donc leur différence en jours reste correcte quel que
            // soit le fuseau horaire local — seule l'affichage final (fallback plus
            // bas) a besoin d'un ancrage en heure locale pour éviter le classique
            // décalage d'un jour.
            const diffDays = Math.round((new Date(dueDate) - new Date(today)) / 86400000);
            if (diffDays === 1) return I18N.t('todo.dateTomorrow');
            if (diffDays === -1) return I18N.t('todo.dateYesterday');
            if (diffDays > 1 && diffDays <= 7) return I18N.t('todo.dateInDays', { n: diffDays });
            if (diffDays < -1 && diffDays >= -7) return I18N.t('todo.dateDaysAgo', { n: -diffDays });
            return new Date(dueDate + 'T00:00:00').toLocaleDateString(I18N.locale(), { day: 'numeric', month: 'short' });
        }

        // ---- Vérification des échéances, en tâche de fond ----
        // Tourne indépendamment de l'ouverture de la fenêtre Todo (déclenchée au
        // chargement du script, donc dès le démarrage de l'OS, puis toutes les 5
        // minutes) : lit directement le fichier VFS, pas l'état d'une fenêtre
        // ouverte. `lastNotifiedFor` évite de renotifier chaque jour pour la même
        // tâche en retard — seul un changement de date de rappel (ou un nouveau
        // jour de retard "pour la première fois") redéclenche une notification.
        async function todoCheckDueDates() {
            const r = await VFS.readFileAsText(TODO_FILE_PATH);
            if (r.error) return;
            let fileData;
            try { fileData = JSON.parse(r.content); } catch (e) { return; }
            if (!fileData || !Array.isArray(fileData.lists)) return;

            const today = todoTodayISO();
            let changed = false;
            fileData.lists.forEach(list => {
                (list.items || []).forEach(item => {
                    if (item.done || !item.dueDate) return;
                    const status = todoDateStatus(item.dueDate, today);
                    if ((status === 'overdue' || status === 'today') && item.lastNotifiedFor !== today) {
                        UI.notify({
                            title: I18N.t('app.todo'),
                            message: I18N.t(status === 'today' ? 'todo.notifyDueToday' : 'todo.notifyOverdue', { text: item.text, list: list.name }),
                            type: status === 'overdue' ? 'warning' : 'info',
                            duration: 8000, icon: TODO_ICON
                        });
                        item.lastNotifiedFor = today;
                        changed = true;
                    }
                });
            });
            if (changed) {
                try { await VFS.writeFile(TODO_FILE_PATH, JSON.stringify(fileData, null, 2), 'application/json', false); } catch (e) {}
            }
        }
        todoCheckDueDates();
        setInterval(todoCheckDueDates, 5 * 60 * 1000);

        I18N.registerLang('fr', {
            'app.todo': 'Tâches',
            'todo.newList': 'Nouvelle liste', 'todo.newListPrompt': 'Nom de la liste :',
            'todo.renameList': 'Renommer', 'todo.deleteList': 'Supprimer la liste',
            'todo.deleteListConfirm': 'Supprimer la liste « {name} » et toutes ses tâches ?',
            'todo.addItemPlaceholder': 'Ajouter une tâche...',
            'todo.clearCompleted': 'Effacer les tâches cochées',
            'todo.itemsLeft': '{n} restante(s)', 'todo.allDone': 'Tout est fait !',
            'todo.emptyLists': 'Aucune liste — créez-en une pour commencer.',
            'todo.emptyItems': 'Aucune tâche. Ajoutez-en une ci-dessus.',
            'todo.invalidName': 'Nom invalide.',
            'todo.setDueDate': 'Définir une échéance', 'todo.dateToday': 'Aujourd\'hui', 'todo.dateTomorrow': 'Demain',
            'todo.dateYesterday': 'Hier', 'todo.dateInDays': 'Dans {n} j', 'todo.dateDaysAgo': 'Il y a {n} j',
            'todo.notifyDueToday': '« {text} » ({list}) est à faire aujourd\'hui.',
            'todo.notifyOverdue': '« {text} » ({list}) est en retard.'
        });
        I18N.registerLang('en', {
            'app.todo': 'To-Do',
            'todo.newList': 'New list', 'todo.newListPrompt': 'List name:',
            'todo.renameList': 'Rename', 'todo.deleteList': 'Delete list',
            'todo.deleteListConfirm': 'Delete the list "{name}" and all its tasks?',
            'todo.addItemPlaceholder': 'Add a task...',
            'todo.clearCompleted': 'Clear checked tasks',
            'todo.itemsLeft': '{n} left', 'todo.allDone': 'All done!',
            'todo.emptyLists': 'No lists yet — create one to get started.',
            'todo.emptyItems': 'No tasks. Add one above.',
            'todo.invalidName': 'Invalid name.',
            'todo.setDueDate': 'Set a due date', 'todo.dateToday': 'Today', 'todo.dateTomorrow': 'Tomorrow',
            'todo.dateYesterday': 'Yesterday', 'todo.dateInDays': 'In {n}d', 'todo.dateDaysAgo': '{n}d ago',
            'todo.notifyDueToday': '"{text}" ({list}) is due today.',
            'todo.notifyOverdue': '"{text}" ({list}) is overdue.'
        });
        I18N.registerLang('es', {
            'app.todo': 'Tareas',
            'todo.newList': 'Nueva lista', 'todo.newListPrompt': 'Nombre de la lista:',
            'todo.renameList': 'Renombrar', 'todo.deleteList': 'Eliminar lista',
            'todo.deleteListConfirm': '¿Eliminar la lista "{name}" y todas sus tareas?',
            'todo.addItemPlaceholder': 'Añadir una tarea...',
            'todo.clearCompleted': 'Borrar tareas marcadas',
            'todo.itemsLeft': '{n} pendiente(s)', 'todo.allDone': '¡Todo hecho!',
            'todo.emptyLists': 'Sin listas — crea una para empezar.',
            'todo.emptyItems': 'Sin tareas. Añade una arriba.',
            'todo.invalidName': 'Nombre inválido.',
            'todo.setDueDate': 'Definir una fecha límite', 'todo.dateToday': 'Hoy', 'todo.dateTomorrow': 'Mañana',
            'todo.dateYesterday': 'Ayer', 'todo.dateInDays': 'En {n}d', 'todo.dateDaysAgo': 'Hace {n}d',
            'todo.notifyDueToday': '"{text}" ({list}) vence hoy.',
            'todo.notifyOverdue': '"{text}" ({list}) está atrasada.'
        });
        I18N.registerLang('de', {
            'app.todo': 'Aufgaben',
            'todo.newList': 'Neue Liste', 'todo.newListPrompt': 'Listenname:',
            'todo.renameList': 'Umbenennen', 'todo.deleteList': 'Liste löschen',
            'todo.deleteListConfirm': 'Liste "{name}" und alle ihre Aufgaben löschen?',
            'todo.addItemPlaceholder': 'Aufgabe hinzufügen...',
            'todo.clearCompleted': 'Erledigte Aufgaben löschen',
            'todo.itemsLeft': '{n} übrig', 'todo.allDone': 'Alles erledigt!',
            'todo.emptyLists': 'Noch keine Liste — erstellen Sie eine, um zu beginnen.',
            'todo.emptyItems': 'Keine Aufgaben. Fügen Sie oben eine hinzu.',
            'todo.invalidName': 'Ungültiger Name.',
            'todo.setDueDate': 'Fälligkeitsdatum festlegen', 'todo.dateToday': 'Heute', 'todo.dateTomorrow': 'Morgen',
            'todo.dateYesterday': 'Gestern', 'todo.dateInDays': 'In {n}T', 'todo.dateDaysAgo': 'Vor {n}T',
            'todo.notifyDueToday': '"{text}" ({list}) ist heute fällig.',
            'todo.notifyOverdue': '"{text}" ({list}) ist überfällig.'
        });

        OS.registry.register({
            id: 'sys-todo', name: I18N.t('app.todo'), nameKey: 'app.todo', icon: TODO_ICON,
            defaultWidth: 560, defaultHeight: 460, singleton: true,
            init: (c, api) => {
                let data = { lists: [] };
                let activeListId = null;

                async function loadData() {
                    const r = await VFS.readFileAsText(TODO_FILE_PATH);
                    if (r.error) return { lists: [] };
                    try { const parsed = JSON.parse(r.content); return (parsed && Array.isArray(parsed.lists)) ? parsed : { lists: [] }; }
                    catch (e) { return { lists: [] }; }
                }
                let savingInternally = false;
                async function saveData() {
                    savingInternally = true;
                    await VFS.writeFile(TODO_FILE_PATH, JSON.stringify(data, null, 2), 'application/json', false);
                    savingInternally = false;
                }

                function activeList() { return data.lists.find(l => l.id === activeListId) || null; }

                async function render() {
                    c.innerHTML = `
                    <div class="todo-shell">
                        <div class="settings-sidebar" id="todo-sidebar"></div>
                        <div class="todo-main" id="todo-main"></div>
                    </div>`;

                    const sidebar = c.querySelector('#todo-sidebar');
                    const newListBtn = document.createElement('button');
                    newListBtn.className = 'settings-tab-btn';
                    newListBtn.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg><span>${I18N.t('todo.newList')}</span>`;
                    newListBtn.onclick = async () => {
                        const name = await UI.prompt({ title: I18N.t('todo.newList'), message: I18N.t('todo.newListPrompt'), validate: (v) => v.trim() ? null : I18N.t('todo.invalidName') });
                        if (name === null) return;
                        const list = { id: genTodoId('list'), name: name.trim(), items: [] };
                        data.lists.push(list);
                        activeListId = list.id;
                        await saveData();
                        await render();
                    };
                    sidebar.appendChild(newListBtn);
                    if (data.lists.length) sidebar.appendChild(document.createElement('div')).className = 'files-tool-sep';

                    data.lists.forEach(list => {
                        const done = list.items.filter(i => i.done).length;
                        const btn = document.createElement('button');
                        btn.className = 'settings-tab-btn' + (list.id === activeListId ? ' active' : '');
                        btn.innerHTML = `<span style="flex:1;text-align:left;overflow:hidden;text-overflow:ellipsis;">${escHtml(list.name)}</span><span class="todo-badge">${done}/${list.items.length}</span>`;
                        btn.onclick = () => { activeListId = list.id; renderMain(); refreshSidebarActive(); };
                        btn.dataset.listId = list.id;
                        sidebar.appendChild(btn);
                    });

                    if (!activeListId && data.lists.length) activeListId = data.lists[0].id;

                    renderMain();
                }

                function refreshSidebarActive() {
                    c.querySelectorAll('#todo-sidebar .settings-tab-btn[data-list-id]').forEach(btn => {
                        btn.classList.toggle('active', btn.dataset.listId === activeListId);
                    });
                }

                function renderMain() {
                    const main = c.querySelector('#todo-main');
                    const list = activeList();

                    if (!list) {
                        main.innerHTML = `<div class="todo-empty">${I18N.t('todo.emptyLists')}</div>`;
                        return;
                    }

                    const done = list.items.filter(i => i.done).length;
                    const remaining = list.items.length - done;

                    main.innerHTML = `
                        <div class="todo-header">
                            <input type="text" class="todo-list-name" id="todo-list-name" value="${escHtml(list.name)}">
                            <button class="files-tool-btn" id="todo-delete-list" title="${I18N.t('todo.deleteList')}">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M4 7h16"/><path d="M6 7v13a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7"/><path d="M9 7V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3"/></svg>
                            </button>
                        </div>
                        <div class="todo-add-row">
                            <input type="text" class="todo-add-input" id="todo-add-input" placeholder="${I18N.t('todo.addItemPlaceholder')}">
                        </div>
                        <div class="todo-items" id="todo-items"></div>
                        <div class="todo-footer">
                            <span class="t-dim">${list.items.length ? (remaining > 0 ? I18N.t('todo.itemsLeft', { n: remaining }) : I18N.t('todo.allDone')) : ''}</span>
                            <span class="files-tool-fill"></span>
                            <button class="files-tool-btn" id="todo-clear-done" ${done === 0 ? 'disabled' : ''}>${I18N.t('todo.clearCompleted')}</button>
                        </div>`;

                    const itemsEl = main.querySelector('#todo-items');
                    if (!list.items.length) {
                        itemsEl.innerHTML = `<div class="todo-empty">${I18N.t('todo.emptyItems')}</div>`;
                    } else {
                        list.items.forEach(item => {
                            const row = document.createElement('div');
                            row.className = 'todo-item' + (item.done ? ' done' : '');
                            const status = todoDateStatus(item.dueDate, todoTodayISO());
                            row.innerHTML = `
                                <label class="todo-checkbox"><input type="checkbox" ${item.done ? 'checked' : ''}><span></span></label>
                                <span class="todo-item-text" contenteditable="true" spellcheck="false">${escHtml(item.text)}</span>
                                <span class="todo-item-date" title="${I18N.t('todo.setDueDate')}" ${status ? `data-status="${status}"` : ''}>
                                    <input type="date" class="todo-date-input" value="${item.dueDate || ''}">
                                    <span class="todo-date-label">${item.dueDate ? escHtml(todoRelativeDateLabel(item.dueDate)) : '📅'}</span>
                                </span>
                                <button class="todo-item-remove" title="${I18N.t('files.toolbar.delete')}">&#10005;</button>`;

                            row.querySelector('input[type="checkbox"]').onchange = async (e) => {
                                item.done = e.target.checked;
                                row.classList.toggle('done', item.done);
                                await saveData();
                                renderFooterOnly();
                            };
                            const textEl = row.querySelector('.todo-item-text');
                            textEl.onblur = async () => {
                                const v = textEl.textContent.trim();
                                if (v) { item.text = v; await saveData(); }
                                else textEl.textContent = item.text;
                            };
                            textEl.onkeydown = (e) => { if (e.key === 'Enter') { e.preventDefault(); textEl.blur(); } };
                            const dateWrap = row.querySelector('.todo-item-date');
                            const dateInput = row.querySelector('.todo-date-input');
                            const dateLabel = row.querySelector('.todo-date-label');
                            dateInput.onchange = async () => {
                                item.dueDate = dateInput.value || null;
                                item.lastNotifiedFor = null; // nouvelle échéance -> une notification doit repartir de zéro
                                const newStatus = todoDateStatus(item.dueDate, todoTodayISO());
                                if (newStatus) dateWrap.dataset.status = newStatus; else delete dateWrap.dataset.status;
                                dateLabel.textContent = item.dueDate ? todoRelativeDateLabel(item.dueDate) : '📅';
                                await saveData();
                            };
                            row.querySelector('.todo-item-remove').onclick = async () => {
                                list.items = list.items.filter(i => i.id !== item.id);
                                await saveData();
                                renderMain();
                            };
                            itemsEl.appendChild(row);
                        });
                    }

                    function renderFooterOnly() {
                        const d = list.items.filter(i => i.done).length;
                        const r = list.items.length - d;
                        main.querySelector('.todo-footer .t-dim').textContent = list.items.length ? (r > 0 ? I18N.t('todo.itemsLeft', { n: r }) : I18N.t('todo.allDone')) : '';
                        main.querySelector('#todo-clear-done').disabled = d === 0;
                        const badge = c.querySelector(`#todo-sidebar .settings-tab-btn[data-list-id="${list.id}"] .todo-badge`);
                        if (badge) badge.textContent = `${d}/${list.items.length}`;
                    }

                    const addInput = main.querySelector('#todo-add-input');
                    addInput.onkeydown = async (e) => {
                        if (e.key !== 'Enter') return;
                        const text = addInput.value.trim();
                        if (!text) return;
                        list.items.push({ id: genTodoId('item'), text, done: false, dueDate: null, lastNotifiedFor: null });
                        addInput.value = '';
                        await saveData();
                        renderMain();
                        main.querySelector('#todo-add-input').focus();
                    };

                    main.querySelector('#todo-list-name').onchange = async (e) => {
                        const v = e.target.value.trim();
                        if (v) { list.name = v; await saveData(); refreshSidebarNames(); }
                        else e.target.value = list.name;
                    };

                    main.querySelector('#todo-delete-list').onclick = async () => {
                        const ok = await UI.confirm({ title: I18N.t('todo.deleteList'), message: I18N.t('todo.deleteListConfirm', { name: list.name }), icon: 'warning' });
                        if (!ok) return;
                        data.lists = data.lists.filter(l => l.id !== list.id);
                        activeListId = data.lists.length ? data.lists[0].id : null;
                        await saveData();
                        await render();
                    };

                    main.querySelector('#todo-clear-done').onclick = async () => {
                        list.items = list.items.filter(i => !i.done);
                        await saveData();
                        renderMain();
                    };
                }

                function refreshSidebarNames() {
                    const list = activeList();
                    if (!list) return;
                    const btn = c.querySelector(`#todo-sidebar .settings-tab-btn[data-list-id="${list.id}"] span`);
                    if (btn) btn.textContent = list.name;
                }

                async function init() {
                    data = await loadData();
                    if (!data.lists.length) {
                        // Première utilisation : une liste de départ pour ne pas ouvrir sur
                        // un écran totalement vide sans repère.
                        data.lists.push({ id: genTodoId('list'), name: I18N.t('todo.newList'), items: [] });
                        await saveData();
                    }
                    activeListId = data.lists[0].id;
                    await render();
                }
                init();

                const onVfsChange = () => {
                    if (savingInternally) return;
                    loadData().then(d => { data = d; if (!activeList() && data.lists.length) activeListId = data.lists[0].id; render(); });
                };
                VFS.onChange(onVfsChange);
                window.addEventListener('webosx:langchange', render);
                const origClose = api.close;
                api.close = () => {
                    window.removeEventListener('webosx:langchange', render);
                    VFS._listeners = VFS._listeners.filter(fn => fn !== onVfsChange);
                    origClose();
                };
            }
        });
