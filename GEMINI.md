# Workspace Rules - Landing Page HAQ Food

## 1. Quy định Git & Remote Repository (STRICT: NO GIT PUSH)
- **TUYỆT ĐỐI KHÔNG** tự ý thực hiện lệnh `git push` lên GitHub hoặc bất kỳ remote repository nào.
- Mọi hành động đẩy code (`git push`, `git push origin ...`, `git push --force`, v.v.) đều bị cấm trong quá trình agent làm việc tự động hoặc khi hoàn tất tính năng/sửa lỗi.
- Chỉ được phép chạy `git push` khi và chỉ khi **người dùng (USER) yêu cầu cụ thể, đích danh bằng văn bản** (ví dụ: "hãy push code lên github", "chạy git push").
- Các thao tác Git cục bộ (local) như `git status`, `git diff`, `git add`, `git commit` được phép sử dụng khi cần lưu lại tiến độ, nhưng code phải **ở lại máy cục bộ (local)**, không được đẩy lên GitHub.
- Sau khi hoàn thành công việc, nếu có tạo commit mới, hãy tóm tắt các thay đổi / commit đã tạo và để người dùng tự kiểm tra và tự quyết định thời điểm push.

---

### English Summary
- **NEVER** run `git push` to GitHub or any remote repository automatically or implicitly.
- Pushing to remote is strictly forbidden unless the user explicitly gives a direct instruction to push.
- Local git actions (`git add`, `git commit`, `git status`) are allowed, but changes must remain local only.
